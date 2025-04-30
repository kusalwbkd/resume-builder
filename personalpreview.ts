/* import { ResumeDetails } from '@/types'
import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PersonalDetailsPreview = ({ resumeInfo }: { resumeInfo: ResumeDetails | undefined }) => {
  return (
    <div >
        <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-xl md:text-3xl text-center' style={{
            color: resumeInfo?.themeColor
          }}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
          <h2 className='text-center text-sm md:text-2xl font-medium'>{resumeInfo?.jobTitle}</h2>
          <h2 className='text-center text-gray-700 font-normal text-xs'>{resumeInfo?.address}</h2>
        </div>
   {resumeInfo?.photo &&
        <img src={resumeInfo?.photo||'/photo.jpg'} alt='photo' className='rounded-full object-cover w-[100px] h-[100px]' />}

      </div>
      

      <div className='grid grid-cols-1  md:grid-cols-2 gap-3 mt-5'>
        <h2 className='font-normal text-xs flex  gap-1'><Phone className='h-4 w-4'/> {resumeInfo?.phone} </h2>
        <h2 className='font-normal text-xs flex  gap-1'> <Mail className='h-4 w-4'/>{resumeInfo?.email} </h2>
        {resumeInfo?.gitHub && <h2 className='font-normal text-xs flex  gap-1'><Github className='h-4 w-4'/> {resumeInfo?.gitHub} </h2>
        }
        {resumeInfo?.linkedIn &&
      <h2 className='font-normal text-xs flex  gap-1'> <Linkedin className='h-4 w-4'/>{resumeInfo?.linkedIn} </h2>}
      {resumeInfo?.website &&
      <h2 className='font-normal text-xs flex  gap-1'> <Globe className='h-4 w-4'/>{resumeInfo?.website} </h2>}

      </div>

      <hr className='border-[1.5px] my-2' style={{
        borderColor: resumeInfo?.themeColor
      }} />
    </div>
  )
}

export default PersonalDetailsPreview */