import { ResumeDetails } from '@/types'
import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PersonalDetailsPreview = ({ resumeInfo }: { resumeInfo: ResumeDetails | undefined }) => {
  return (
    <div className="break-inside-avoid">
    <div className="flex justify-between items-center flex-wrap gap-y-4">
      <div className="flex-1 text-center md:text-left">
        <h1
          className="font-bold text-xl md:text-3xl"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className="text-sm md:text-2xl font-medium mt-1">
          {resumeInfo?.jobTitle}
        </h2>
        <p className="text-gray-700 font-normal text-xs mt-1">
          {resumeInfo?.address}
        </p>
      </div>
  
      {resumeInfo?.photo && (
        <img
          src={resumeInfo?.photo || '/photo.jpg'}
          alt="photo"
          className="rounded-full object-cover w-[100px] h-[100px] border-2"
          style={{ borderColor: resumeInfo?.themeColor }}
        />
      )}
    </div>
  
    <div className="flex flex-wrap gap-x-10 gap-y-2 mt-5 break-inside-avoid text-xs font-normal">
      <h2 className="flex items-center gap-2 min-w-[230px]">
        <Phone className="h-4 w-4" />
        <span>{resumeInfo?.phone}</span>
      </h2>
      <h2 className="flex items-center gap-2 min-w-[230px]">
        <Mail className="h-4 w-4" />
        <span>{resumeInfo?.email}</span>
      </h2>
      {resumeInfo?.gitHub && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Github className="h-4 w-4" />
          <span>{resumeInfo?.gitHub}</span>
        </h2>
      )}
      {resumeInfo?.linkedIn && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Linkedin className="h-4 w-4" />
          <span>{resumeInfo?.linkedIn}</span>
        </h2>
      )}
      {resumeInfo?.website && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Globe className="h-4 w-4" />
          <span>{resumeInfo?.website}</span>
        </h2>
      )}
    </div>
  
    <hr
      className="border-[1.5px] my-3"
      style={{ borderColor: resumeInfo?.themeColor }}
    />
  </div>
  
  )
}

export default PersonalDetailsPreview