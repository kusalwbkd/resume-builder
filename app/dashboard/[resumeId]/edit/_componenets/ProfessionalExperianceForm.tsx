"use client"
import { Input } from '@/components/ui/input'
import { useResumeProvider } from '@/context/ResumeProvider'
import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import RichTextEditor from './RichTextEditor'
import { Experience, ResumeDetails } from '@/types'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Check, Clipboard, Lightbulb, Loader } from 'lucide-react'

const ProfessionalExperianceForm = (
   { enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
      resumeInfo:ResumeDetails,
      setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
    }
) => {
  const formField: Experience = {
    title: '',
    companyName: '',
    location: '',
    currentlyWorking: false,
    startDate: '',
    endDate: '',
    workingSummary: ''

  }
  type Params = {
    resumeId: string; 
  };
   const[loading,setLoading]=useState(false)
      const{resumeId}=useParams<Params>()
   
const{user}=useUser()
  const [experianceList, setExperianceList] = useState<any>(resumeInfo?.experience||[formField]);


  const addMoreExperiance = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setExperianceList([...experianceList, formField])
  }

  const removeExperiance = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const updatedList = experianceList.slice(0, -1); // ✅ updated array
     setExperianceList(updatedList);
    setResumeInfo({
      ...resumeInfo,
      experience:updatedList
    }) 
    toast.error('Experiance removed')
      //setExperianceList(updatedList)

  }

  const handleRichTextEditor=(e: React.ChangeEvent<HTMLInputElement>, Name:string,index: number)=>{
   // e.preventDefault()

    const { name, value } = e.target;
    const updatedList = [...experianceList];
    updatedList[index] = { ...updatedList[index], [Name]: value };
    setExperianceList(updatedList);
    
    setResumeInfo({
      ...resumeInfo,
      experience: updatedList,
    });



  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;

    const updatedList = [...experianceList];
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
    setExperianceList(updatedList);

    setResumeInfo({
      ...resumeInfo,
      experience: updatedList,
    });

  };

  const onSave=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const result=await axios.patch('/api/update-resume',{
            email:user?.primaryEmailAddress?.emailAddress,
            resumeId: resumeId,
            experience:JSON.stringify(experianceList),
            themeColor:resumeInfo?.themeColor

         },
         {
            headers: {
              "Content-Type": "application/json",
            },
          })

          const { data } = result;
          const {
            experience
          } = data[0];
          
          setResumeInfo({
           ...resumeInfo,
           experience:JSON.parse(experience)
          });
      
          toast.success("working data updated");
          //enableNext(true)
    } catch (error) {
       toast.error('Error while updating working data') 
    }finally{
        setLoading(false)
    }
    
   }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Job Experiance</h2>
        <p>Add your job experiance</p>
        <form onSubmit={onSave}>
          {experianceList?.map((item: any, index: number) => (

            <div key={index}>
              <div className='grid grid-cols-2 gap-3 rounded-lg border p-3 my-5'>
                <div className='col-span-2'>
                  <label className='text-xs'>Postion title</label>
                  <Input name='title' placeholder='Add your job title' value={item.title} onChange={(e) => handleChange(e, index)} />
                </div>

                <div className='col-span-2'>
                  <label className='text-xs'>Company name</label>
                  <Input name='companyName' placeholder='Add your company name' value={item.companyName} onChange={(e) => handleChange(e, index)} />
                </div>

                <div className='col-span-2'>
                  <label className='text-xs'>Location</label>
                  <Input name='location' placeholder='Add your job Location' value={item.location} onChange={(e) => handleChange(e, index)} />
                </div>


                <div className='flex gap-3 col-span-2'>
                  <label className='text-xs'>Currently working?</label>
                  <Checkbox
                    name="currentlyWorking"
                    checked={item.currentlyWorking}
                    onCheckedChange={(checked: boolean) => {
                      const updatedList = [...experianceList];
                      updatedList[index] = {
                        ...updatedList[index],
                        currentlyWorking: checked,
                        endDate: checked ? '' : updatedList[index].endDate, // clear end date if currently working
                      };
                      setExperianceList(updatedList);
                      setResumeInfo({ ...resumeInfo, experience: updatedList });
                    }}
                  />
                </div>

                <div>
                  <label className='text-xs'>Start date</label>
                  <Input type='date' name='startDate' placeholder='Add your job Start date'
                    onChange={(e) => handleChange(e, index)}
                    required
                    value={item.startDate}
                  />
                </div>

                {!item.currentlyWorking && (
                  <div>
                    <label className='text-xs'>End  date</label>
                    <Input type='date' name='endDate' placeholder='Add your job end date'
                      value={item.endDate}
                      required
                      onChange={(e) => handleChange(e, index)} />
                  </div>
                )}

                <div className='col-span-2'>
                  <RichTextEditor 
                  onRichEditorChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleRichTextEditor(e,'workingSummary',index)}
                  item={item}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <Button type='button' variant={'outline'} className='text-primary font-semibold cursor-pointer border-primary'
              onClick={(e:any)=>addMoreExperiance(e)}
            >+ Add more</Button>
            {experianceList.length > 1 &&
              <Button type='button' variant={'outline'} className='text-destructive font-semibold cursor-pointer border-destructive '
                onClick={(e:any)=>removeExperiance(e)}
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

export default ProfessionalExperianceForm