"use client"
import ResumePreview from '@/app/dashboard/[resumeId]/edit/_componenets/ResumePreview'
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 500); // wait for render
  }, []);
  return (
    <div>
       <ResumePreview />
    </div>
  )
}

export default page