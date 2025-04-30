"use client"
import { Input } from '@/components/ui/input'
import { useResumeProvider } from '@/context/ResumeProvider'
import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import RichTextEditor from './RichTextEditor'
import { Experience, Refree, ResumeDetails } from '@/types'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Check, Clipboard, Lightbulb, Loader } from 'lucide-react'

const RefreeForm = (
   { enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
      resumeInfo:ResumeDetails,
      setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
    }
) => {
  const formField: Refree = {
    name:'',
    email:'',
    address:'',
    designation:'',
    phone:''
  }
  type Params = {
    resumeId: string; 
  };
   const[loading,setLoading]=useState(false)
      const{resumeId}=useParams<Params>()
   
const{user}=useUser()
  const [refreeList, setRefreeList] = useState<any>(resumeInfo?.refrees||[formField]);


  const addMoreRefree = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setRefreeList([...refreeList, formField])
  }

  const removeRefree = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const updatedList = refreeList.slice(0, -1); // ✅ updated array
     setRefreeList(updatedList);
    setResumeInfo({
      ...resumeInfo,
      refrees:updatedList
    }) 
    toast.error('Refree removed')
      //setExperianceList(updatedList)

  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;

    const updatedList = [...refreeList];
    updatedList[index] = { ...updatedList[index], [name]: value };
   
    setRefreeList(updatedList);

    setResumeInfo({
      ...resumeInfo,
      refrees: updatedList,
    });

  };

  const onSave=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const result=await axios.patch('/api/update-resume',{
          email:user?.primaryEmailAddress?.emailAddress,
            resumeId: resumeId,
            refrees:JSON.stringify(refreeList)
         },
         {
            headers: {
              "Content-Type": "application/json",
            },
          })

          const { data } = result;
          const {
            refrees
          } = data[0];
          
          setResumeInfo({
           ...resumeInfo,
           refrees:JSON.parse(refrees)
          });
      
          toast.success("Refree data updated");
          enableNext(true)
    } catch (error) {
       toast.error('Error while updating working data') 
    }finally{
        setLoading(false)
    }
    
   }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Refree Information</h2>
        <p>Add your refree details</p>
        <form onSubmit={onSave}>
          {refreeList?.map((item: any, index: number) => (

            <div key={index}>
              <div className='grid grid-cols-2 gap-3 rounded-lg border p-3 my-5'>
                <div>
                  <label className='text-xs'>Refree Name</label>
                  <Input name='name' value={item.name} onChange={(e) => handleChange(e, index)} />
                </div>

                <div>
                  <label className='text-xs'>Designation</label>
                  <Input name='designation' value={item.designation} onChange={(e) => handleChange(e, index)} />
                </div>

                <div className='col-span-2'>
                  <label className='text-xs'> Official Address</label>
                  <Input name='address' value={item.address} onChange={(e) => handleChange(e, index)} />
                </div>

                <div>
                  <label className='text-xs'>Phone Number</label>
                  <Input name='phone' value={item.phone} onChange={(e) => handleChange(e, index)} />
                </div>

                <div>
                  <label className='text-xs'>Email</label>
                  <Input name='email' value={item.email} onChange={(e) => handleChange(e, index)} />
                </div>


              </div>
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <Button type='button' variant={'outline'} className='text-primary font-semibold cursor-pointer border-primary'
              onClick={(e:any)=>addMoreRefree(e)}
            >+ Add more</Button>
            {refreeList.length > 1 &&
              <Button type='button' variant={'outline'} className='text-destructive font-semibold cursor-pointer border-destructive '
                onClick={(e:any)=>removeRefree(e)}
              > - Remove Experiance</Button>}
          </div>
          <div className='flex justify-end mt-5'>
            <Button type='submit' className='cursor-pointer' disabled={loading}>
               {loading? <Loader className='animate-spin'/>:'Save'}
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default RefreeForm