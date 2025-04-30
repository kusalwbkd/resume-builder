"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeDetails, Skill } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const SkillsForm = (
      { enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
          resumeInfo:ResumeDetails,
          setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
        }
) => {
    const formField: Skill = {
        skillName: '',
        rating: 0

    }

    type Params = {
        resumeId: string;
    };
    const [loading, setLoading] = useState(false)
    const { resumeId } = useParams<Params>()

    const [skillsList, setSkillsList] = useState<any>(resumeInfo?.skills || [formField])
    const { user } = useUser()

    const addMoreSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSkillsList([...skillsList, formField])
    }

    const removeSkil = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const updatedList = skillsList.slice(0, -1); // ✅ updated array
        setSkillsList(updatedList);
        setResumeInfo({
            ...resumeInfo,
            skills: updatedList
        })
        toast.error('Skill removed')
        //setExperianceList(updatedList)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        enableNext(false)
        const updatedList = [...skillsList];
        updatedList[index] = { ...updatedList[index], [name]: value };

        setSkillsList(updatedList);

        setResumeInfo({
            ...resumeInfo,
            skills: updatedList,
        });

    };

    const onSave=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const result=await axios.patch('/api/update-resume',{
                email:user?.primaryEmailAddress?.emailAddress,
                resumeId: resumeId,
                skills:JSON.stringify(skillsList)
             },
             {
                headers: {
                  "Content-Type": "application/json",
                },
              })
    
              const { data } = result;
              const {
                skills
              } = data[0];
              
              setResumeInfo({
               ...resumeInfo,
               skills:JSON.parse(skills)
              });
          
              toast.success("Skill section updated");
              enableNext(true)
        } catch (error) {
           toast.error('Error while updating skill data') 
        }finally{
            setLoading(false)
        }
        
       }

    
        return (
            <div>
                <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                    <h2 className='font-bold text-lg'>Skills</h2>
                    <p>Add your skills</p>
    
    
                    <form onSubmit={onSave}>
                        {skillsList.map((skill: any, index: number) => (
                            <div key={index}>
                                <div>
                                    <label className='text-xs'>Skill Name</label>
                                    <Input name='skillName' onChange={(e) => handleChange(e, index)} value={skill.skillName} />
                                </div>
                            </div>
                        ))}
    
                        <div className='flex justify-between items-center'>
                            <Button type='button' variant={'outline'} className='text-primary font-semibold cursor-pointer border-primary my-3'
                                onClick={(e: any) => addMoreSkills(e)}
                            >+ Add more</Button>
                            {skillsList.length > 1 &&
                                <Button type='button' variant={'outline'} className='text-destructive font-semibold cursor-pointer border-destructive '
                                    onClick={(e: any) => removeSkil(e)}
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

export default SkillsForm