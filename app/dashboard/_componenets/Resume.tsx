
"use client"
import { Loader, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from 'sonner'
import Loading from '@/app/_components/Loading'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const Resume = () => {
    const [openDialogue, setOpenDialogue] = useState(false)
    const[resumeTitle,setResumeTitle]=useState<string>('')

    const[loading,setLoading]=useState(false)
    const{user}=useUser()
    const router=useRouter()
    const email=user?.primaryEmailAddress?.emailAddress


    const resumeCreate=async()=>{
        setLoading(true)
        try {
            const result=await axios.post('/api/create-resume',
                {
                    title:resumeTitle,
                    email,
                    userName:user?.fullName

                })
           const{dbResult}=result.data
           
           router.push(`/dashboard/${dbResult[0]?.id}/edit`)
           
            toast.success('resume created')
        } catch (error) {
            console.log(error);
            toast.error('Error while creating resume created')
            
        }finally{
            setLoading(false)
        }
       
        
    }

    

  
    return (
        <div className='mt-10'>
            <div
                onClick={() => setOpenDialogue(true)}
                className='p-14 py-24 border items-center
         flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all ease-in-out hover:shadow-md cursor-pointer'>
                <PlusSquare />
            </div>

            <Dialog open={openDialogue}>
              
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new resume</DialogTitle>
                        <DialogDescription>
                          Add a title for your resume
                           <Input placeholder='HR resume' className='mt-3'
                           required 
                           onChange={(e)=>setResumeTitle(e.target.value)}
                           />

                        
                        </DialogDescription>
                        <div className='flex gap-5  justify-end'>
                            <Button variant={'ghost'} onClick={()=>setOpenDialogue(false)}>Cancel</Button>
                            <Button onClick={resumeCreate} className='cursor-pointer' disabled={loading}>
                                {loading ?<><Loader className='animate-spin'/>  </> :'Create'}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default Resume