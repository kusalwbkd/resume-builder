"use client"
import ResumePreview from '@/app/dashboard/[resumeId]/edit/_componenets/ResumePreview'
import ResumePreview2 from '@/app/dashboard/[resumeId]/edit/_layout2/ResumePreview2';
import ResumePreview3 from '@/app/dashboard/[resumeId]/edit/_layout3/ResumePreview3';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
   const searchParams = useSearchParams();
    const layout = parseInt(searchParams.get("layout") || "1"); 
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 500); // wait for render
  }, []);
  return (
    <div>
         {layout ===1 &&   <ResumePreview layout={layout} showCoverLetter={true}/>}
        {layout ===2 &&   <ResumePreview2 layout={layout} showCoverLetter={true}/>}
        {layout ===3 &&   <ResumePreview3 layout={layout} showCoverLetter={true}/>}
      
    </div>
  )

}

export default page