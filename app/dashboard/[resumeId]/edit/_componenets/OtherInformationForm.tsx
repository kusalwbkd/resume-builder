"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ResumeDetails } from '@/types';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const OtherInformationForm = (
  { enableNext, resumeLoading, resumeInfo, setResumeInfo }: {
    enableNext: (v: boolean) => void, resumeLoading: boolean
    resumeInfo: ResumeDetails,
    setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
  }
  ) => {
      type Params = {
        resumeId: string; 
      };

      const[loading,setLoading]=useState(false)
      const{user}=useUser()
      const{resumeId}=useParams<Params>()
      const email=user?.primaryEmailAddress?.emailAddress


          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            //enableNext(false)
           
              setResumeInfo({
                ...resumeInfo,
                [name]: value,
              });
            
          };

          const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
          
            try {
          
              const result = await axios.patch(
                "/api/update-resume",
                {
                  email,
                  resumeId: resumeId,
                  languages:resumeInfo.languages,
                  notice_period:resumeInfo?.notice_period,
                  themeColor:resumeInfo?.themeColor

                  
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
          
              const { data } = result;
              const {
                languages,
                notice_period

              } = data[0];
          
              setResumeInfo({
                ...resumeInfo,
                notice_period,
                languages
              });
          
              toast.success("Languages & Availability updated");
              
            } catch (error) {
              toast.error("Error while updating Languages & Availability");
            } finally {
              setLoading(false);
            }
          };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Languages & Availability</h2>
        <p>Add Languages & Availability</p>
         <form onSubmit={onSave}>
         <div className='grid grid-cols-2 mt-5 gap-3'>
         <div className='col-span-2'>
            <label className='text-sm'>Languages</label>
            <Input name='languages' 
            placeholder='English,French'
            onChange={handleInputChange} value={resumeInfo?.languages}/>
         </div>

         <div className='col-span-2'>
            <label className='text-sm'>Notice Period</label>
            <Input name='notice_period' 
            placeholder='2 weeks'
            onChange={handleInputChange} value={resumeInfo?.notice_period}/>
         </div>
         </div>

         <div className='mt-3 flex justify-end'> 
            <Button type='submit' className='cursor-pointer' disabled={loading}>
               {loading? <Loader className='animate-spin'/>:'Save'}
            </Button>
        </div>
         </form>
      </div>
    </div>
  )
}

export default OtherInformationForm