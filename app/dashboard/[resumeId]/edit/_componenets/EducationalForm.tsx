"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Education, ResumeDetails } from '@/types'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const EducationalForm = (
     { enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
        resumeInfo:ResumeDetails,
        setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
      }
) => {
    const formField: Education = {
        institutionName: '',
        location: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        currentlyStudying: false

    }

    type Params = {
        resumeId: string;
    };
    const [loading, setLoading] = useState(false)
    const { resumeId } = useParams<Params>()
    const [educationList, setEducationList] = useState<any>(resumeInfo?.education || [formField]);

    const { user } = useUser()
    const email=user?.primaryEmailAddress?.emailAddress

    const addMoreEducation = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setEducationList([...educationList, formField])
    }

    const removeEducation = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const updatedList = educationList.slice(0, -1); // ✅ updated array
        setEducationList(updatedList);
        setResumeInfo({
            ...resumeInfo,
            education: updatedList
        })
        toast.error('Experiance removed')
        //setExperianceList(updatedList)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
   
        const updatedList = [...educationList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        const { startDate, endDate } = updatedList[index];
        if (
            updatedList[index].endDate &&
            updatedList[index].startDate &&
            new Date(updatedList[index].endDate) < new Date(updatedList[index].startDate)
        ) {
            toast.warning("End date cannot be before start date.");
            return; // Do not update state
        }
        setEducationList(updatedList);

        setResumeInfo({
            ...resumeInfo,
            education: updatedList,
        });

    };

    const onSave=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const result=await axios.patch('/api/update-resume',{
                email,
                resumeId: resumeId,
                education:JSON.stringify(educationList)
             },
             {
                headers: {
                  "Content-Type": "application/json",
                },
              })
    
              const { data } = result;
              const {
                education
              } = data[0];
              
              setResumeInfo({
               ...resumeInfo,
               education:JSON.parse(education)
              });
          
              toast.success("Education data updated");
            
        } catch (error) {
           toast.error('Error while updating Education data') 
        }finally{
            setLoading(false)
        }
        
       }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Educational details</h2>
                <p>Add your education</p>
                <form onSubmit={onSave}>
                    {educationList.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <div className='grid grid-cols-2 gap-3 rounded-lg border p-3 my-5'>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label className='text-sm'>University</label>
                                        <Input name='institutionName' 
                                        className='text-sm'
                                        value={item.institutionName} onChange={(e) => handleChange(e, index)} required/>
                                    </div>

                                    <div className='col-span-2 md:col-span-1'>
                                        <label className='text-sm'>Location</label>
                                        <Input className='text-sm' name='location' value={item.location} onChange={(e) => handleChange(e, index)} required />
                                    </div>

                                    <div className='col-span-2 md:col-span-1'> 
                                        <label className='text-sm'>Degree</label>
                                        <Input className='text-sm' name='degree' value={item.degree} onChange={(e) => handleChange(e, index)} required/>
                                    </div>

                                    <div className='col-span-2 md:col-span-1'>
                                        <label className='text-sm'>Major/ Field of study</label>
                                        <Input className='text-sm' name='fieldOfStudy' value={item.fieldOfStudy} onChange={(e) => handleChange(e, index)} required/>
                                    </div>
                                    <div className='col-span-2 '>
                                        <label className='text-xs'>Currently working?</label>
                                        <Checkbox
                                            name="currentlyWorking"
                                            checked={item.currentlyStudying}
                                            onCheckedChange={(checked: boolean) => {
                                                const updatedList = [...educationList];
                                                updatedList[index] = {
                                                    ...updatedList[index],
                                                    currentlyStudying: checked,
                                                    endDate: checked ? '' : updatedList[index].endDate, // clear end date if currently working
                                                };
                                                setEducationList(updatedList);
                                                setResumeInfo({ ...resumeInfo, education: updatedList });
                                            }}
                                        />
                                    </div>


                                    <div className='col-span-2 md:col-span-1'>
                                        <label className='text-sm'>Start Date</label>
                                        <Input name='startDate'
                                        className='text-sm'
                                         type='date' value={item.startDate} 
                                         onChange={(e) => handleChange(e, index)} 
                                         required
                                         />
                                    </div>

                                    {!item.currentlyStudying && (
                                        <div className='col-span-2 md:col-span-1'>
                                            <label className='text-sm'>End  date</label>
                                            <Input type='date' name='endDate'
                                            className='text-sm'
                                                value={item.endDate}
                                                onChange={(e) => handleChange(e, index)}
                                                required={!item.currentlyStudying}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex justify-between items-center'>
                        <Button type='button' variant={'outline'} className='text-primary font-semibold cursor-pointer border-primary'
                            onClick={(e: any) => addMoreEducation(e)}
                        >+ Add more</Button>
                        {educationList.length > 1 &&
                            <Button type='button' variant={'outline'} className='text-destructive font-semibold cursor-pointer border-destructive '
                                onClick={(e: any) => removeEducation(e)}
                            > - Remove Experiance</Button>}
                    </div>
                    <div className='flex justify-end mt-5'>
                        <Button type='submit' className='cursor-pointer' disabled={loading}>
                            {loading ? <Loader className='animate-spin' /> : 'Save'}
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EducationalForm