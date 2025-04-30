"use client"
import React, { useRef } from 'react'
import FormSection from './_componenets/FormSection'
import ResumePreview from './_componenets/ResumePreview'

const EditResume = () => {

  return (
    <div className='grid grid-cols-1 md:grid-cols-6 p-4 gap-6'>
    <div className='col-span-6 md:col-span-2'>
      <FormSection  />
    </div>
    <div className='col-span-6 md:col-span-4 overflow-x-auto'>
      <div className='min-w-[794px]'>
        <ResumePreview  />
      </div>
    </div>
  </div>
  
  
  )
}

export default EditResume