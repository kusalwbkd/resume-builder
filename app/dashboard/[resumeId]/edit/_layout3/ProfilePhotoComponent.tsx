import { ResumeDetails } from '@/types'
import React from 'react'

const ProfilePhotoComponent = ({ resumeInfo,layout }: { resumeInfo: ResumeDetails| undefined,layout:number}) => {
  return (
    <div className='flex flex-col items-center justify-center '>
         {resumeInfo?.photo && (
        <img
          src={resumeInfo?.photo || '/photo.jpg'}
          alt="photo"
          className="rounded-full object-cover w-[100px] h-[100px] border-2"
          style={{ borderColor: resumeInfo?.themeColor }}
        />
      )}
    </div>
  )
}

export default ProfilePhotoComponent