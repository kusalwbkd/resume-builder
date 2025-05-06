 "use client"
import React, { useRef, useState } from 'react'
import FormSection from './_componenets/FormSection'
import ResumePreview from './_componenets/ResumePreview'
import ResumePreview2 from './_layout2/ResumePreview2'
import ResumePreview3 from './_layout3/ResumePreview3'
import { useSearchParams } from 'next/navigation'

const EditResume = () => {
  const searchParams = useSearchParams();
    const layout = parseInt(searchParams.get("layout") || "1"); 
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 p-4 gap-6'>
    <div className='col-span-6 md:col-span-2'>
      <FormSection  layout={layout}/>
    </div>
    <div className='col-span-6 md:col-span-4 overflow-x-auto'>
      <div className='min-w-[794px]'>
        {layout ===1 &&   <ResumePreview layout={layout} showCoverLetter={false}/>}
        {layout ===2 &&   <ResumePreview2 layout={layout} showCoverLetter={false}/>}
        {layout ===3 &&   <ResumePreview3 layout={layout} showCoverLetter={false}/>}
      
      
      </div>
    </div>
  </div>
  
  
  )
}

export default EditResume 
