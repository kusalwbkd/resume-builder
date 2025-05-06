"use client"
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import ResumePreview from '../_componenets/ResumePreview';
import ResumePreview2 from '../_layout2/ResumePreview2';
import ResumePreview3 from '../_layout3/ResumePreview3';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const FinalPage = () => {
    const searchParams = useSearchParams();
  const layout = parseInt(searchParams.get("layout") || "1"); 
  const router=useRouter()
   type Params = {
      resumeId: string; 
    };
        const{resumeId}=useParams<Params>()
  return (
    <div>
             {layout ===1 &&   <ResumePreview layout={layout} showCoverLetter={true}/>}
        {layout ===2 &&   <ResumePreview2 layout={layout} showCoverLetter={true}/>}
        {layout ===3 &&   <ResumePreview3 layout={layout} showCoverLetter={true}/>}
        <div className='flex flex-col items-center justify-center gap-3 mt-5'>
        <Button
              className=" cursor-pointer text-white text-lg flex items-center justify-center gap-2"
              onClick={()=>router.push(`/print/${resumeId}?layout=${layout}`)}
              
            >
              <Download size={20} />
              Download Resume and Cover Letter
            </Button>
            </div>
    </div>
  )
}

export default FinalPage