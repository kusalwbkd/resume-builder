"use client"
import Loading from '@/app/_components/Loading'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useResumeProvider } from '@/context/ResumeProvider'
import { ResumeDetails } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { BrainIcon, Check, Clipboard, Lightbulb, Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SummaryForm = (
  { enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
    resumeInfo:ResumeDetails,
    setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
  }
) => {
  
  const [loading, setLoading] = useState(false)
  type Params = {
    resumeId: string;
  };
 /*  useEffect(() => {
    if (resumeInfo?.summary) {
      enableNext(true);
    }
  }, [resumeInfo?.summary]);
 */
  const { user } = useUser()
  const { resumeId } = useParams<Params>()

  const generateSummaray=async()=>{
    setLoading(true)
    try {
      const resp=await axios.post('/api/generate-user-summary',{
       summary:resumeInfo?.summary,
       title:resumeInfo?.jobTitle
      })
      toast.info('AI summary generated!')
      let aiSummary = '';
      if (typeof resp.data.results === 'string') {
        aiSummary = resp.data.results; // If it's directly a string
      } else if (typeof resp.data.results === 'object' && resp.data.results.about_me) {
        aiSummary = resp.data.results.about_me; // If it's an object with about_me inside
      } else {
        throw new Error('Unexpected AI response format');
      }
  
     
      
    setResumeInfo({
      ...resumeInfo,
      summary:aiSummary
    })     
    } catch (error) {
      console.log(error);
      toast.error('error in AI summary generating')
      
    }finally{
      setLoading(false)
    }
   
    
  }

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.patch('/api/update-resume', {
        email:user?.primaryEmailAddress?.emailAddress,
        resumeId: resumeId,
        summary: resumeInfo?.summary
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })

      const { data } = result;
      const {
        summary
      } = data[0];

      setResumeInfo({
        ...resumeInfo,
        summary
      });

      toast.success("summary updated");
     // enableNext(true)
    } catch (error) {
      toast.error('Error while updating summary')
    } finally {
      setLoading(false)
    }

  }


  if (resumeLoading) {
    return <Loading />
  }


  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for your job title</p>
        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>

          </div>

          <Button className='flex gap-2 text-primary my-3 cursor-pointer'
            variant={'outline'}
            disabled={loading || !resumeInfo?.summary}
          onClick={generateSummaray}
          >
            {loading ? <><Loader className='animate-spin' /> Generating... </> : <><BrainIcon /> Generate with AI</>}
          </Button>

          <div className="bg-blue-50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm my-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
              <Lightbulb className="text-blue-500" />
              Tips for Writing a Great About Me
            </h2>

            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Clipboard className="mt-1 text-blue-500" />
              <span>
                Share a brief <span className="font-medium">introduction</span> about yourself, your <span className="font-medium">professional background</span>,
                key <span className="font-medium">skills</span>,<span className="font-medium">Experiance</span>, <span className="font-medium">interests</span>, and what drives you.
              </span>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Check className="mt-1 text-green-500" />
              <span>
                Keep it <span className="font-medium">authentic</span> and <span className="font-medium">personal</span> — highlight what makes you unique beyond just your technical skills.
              </span>
            </div>
          </div>

          <Textarea required
           rows={6}
          className='mt-5 text-sm' name='summary'  value={resumeInfo?.summary} onChange={(e) => setResumeInfo({
            ...resumeInfo,
            summary: e.target.value
          })} />

          <div className='mt-2 flex justify-end cursor-pointer'>
            <Button type='submit' className='cursor-pointer' disabled={loading}>
              {loading ? <Loader className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SummaryForm