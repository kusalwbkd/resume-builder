import { ResumeDetails } from '@/types'
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PersonalDetailsPreview = ({resumeInfo,layout}:{resumeInfo:ResumeDetails | undefined,layout:number}) => {
  return (
    <div className="break-inside-avoid">
    <div className="flex justify-between items-center flex-wrap gap-y-4">
      <div className="flex-1 text-center md:text-left">
        <h1
          className={`font-bold text-xl md:text-3xl`}
          style={{ color: layout===1 ? resumeInfo?.themeColor:layout===2 ?'black':resumeInfo?.themeColor }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className={`text-sm md:text-2xl ${layout===1 && 'font-medium'} mt-1 ${layout===2 && 'font-bold'}`}
         style={{ color: layout===1 ?'black':layout===2 ? resumeInfo?.themeColor:resumeInfo?.themeColor }}
        >
          {resumeInfo?.jobTitle}
        </h2>
        {layout===1 &&
        <p className="text-gray-700 font-normal text-xs mt-1">
          {resumeInfo?.address}
        </p>}
      </div>
  
      {resumeInfo?.photo && layout!==3&& (
        <img
          src={resumeInfo?.photo || '/photo.jpg'}
          alt="photo"
          className="rounded-full object-cover w-[100px] h-[100px] border-2"
          style={{ borderColor: resumeInfo?.themeColor }}
        />
      )}
    </div>
  
    <div className={`flex flex-wrap gap-x-10 gap-y-2 mt-5 
      break-inside-avoid text-xs font-normal `}>
      <h2 className="flex items-center gap-2 min-w-[230px]">
        <Phone className="h-4 w-4 " style={{color:resumeInfo?.themeColor}}/>
        <span>{resumeInfo?.phone}</span>
      </h2>
      <h2 className="flex items-center gap-2 min-w-[230px]">
        <Mail className="h-4 w-4" style={{color:resumeInfo?.themeColor}} />
        <span>{resumeInfo?.email}</span>
      </h2>
      {resumeInfo?.gitHub && layout===1 && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Github className="h-4 w-4" />
          <span>{resumeInfo?.gitHub}</span>
        </h2>
      )}
      {resumeInfo?.linkedIn && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Linkedin className="h-4 w-4" style={{color:resumeInfo?.themeColor}}/>
          <span>{resumeInfo?.linkedIn}</span>
        </h2>
      )}
      {resumeInfo?.website && layout===1 && (
        <h2 className="flex items-center gap-2 min-w-[230px]">
          <Globe className="h-4 w-4" />
          <span>{resumeInfo?.website}</span>
        </h2>
      )}

        {layout===2 &&
          <h2 className="flex items-center gap-2 min-w-[230px]">
          <MapPin className="h-4 w-4" style={{color:resumeInfo?.themeColor}} />
          <span>{resumeInfo?.address}</span>
        </h2>
       }
    </div>
  
    <hr
      className="border-[1.5px] my-3"
      style={{ borderColor: resumeInfo?.themeColor }}
    />
  </div>
  
  )
}

export default PersonalDetailsPreview