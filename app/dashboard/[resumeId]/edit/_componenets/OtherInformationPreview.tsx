import { ResumeDetails } from '@/types'
import React from 'react'

const OtherInformationPreview = (
 {resumeInfo,layout}:{resumeInfo:ResumeDetails | undefined,layout:number}
) => {
  if (resumeInfo?.notice_period || resumeInfo?.languages) {
    return (
      <div className="my-6 break-inside-avoid">
        <h2 className={` font-bold text-xl mb-2 ${layout === 1||
          layout===3 && 'text-center'} ${layout === 2 && 'text-start'}`}>
          Languages and Availability
        </h2>
        <hr className="mb-4" />
        <div className="flex flex-col justify-center gap-2 break-inside-avoid">
          {resumeInfo.languages && (
            <div className="flex gap-2 text-sm ">
              <span className="font-semibold text-gray-700">Languages:</span>
              <span className="font-bold" style={{ color: resumeInfo.themeColor }}>
                {resumeInfo.languages}
              </span>
            </div>
          )}
  
          {resumeInfo.notice_period && (
            <div className="flex gap-2 text-sm">
              <span className="font-semibold text-gray-700">Notice Period:</span>
              <span className="font-bold" style={{ color: resumeInfo.themeColor }}>
                {resumeInfo.notice_period}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
  
 
}

export default OtherInformationPreview