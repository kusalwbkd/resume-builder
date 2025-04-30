import { Experience, ResumeDetails } from '@/types'
import React from 'react'

const ProffesionalExperiance = ({resumeInfo}:{resumeInfo:ResumeDetails | undefined}) => {

  if(resumeInfo?.experience && resumeInfo.experience.length>=1){
    return (
      <div className="my-6 break-inside-avoid">
      <h2 className="text-center font-bold text-sm mb-2">Professional Experience</h2>
      <hr className="mb-4" />
      {resumeInfo?.experience?.map((item: Experience, index: number) => (
        <div
          key={index}
          className="mb-6 p-4 rounded-md border shadow-sm break-inside-avoid"
          style={{ borderColor: resumeInfo?.themeColor }}
        >
          <h2
            className="text-base font-bold mb-1"
            style={{ color: resumeInfo?.themeColor }}
          >
            {item?.title}
          </h2>
    
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs font-medium text-gray-800 mb-1">
            <span>{item?.companyName}, {item?.location}</span>
            <span>{item?.startDate} - {item?.currentlyWorking ? 'Present' : item?.endDate}</span>
          </div>
    
          <div
            className="custom-rich-text text-xs text-gray-700 break-words prose prose-sm"
            dangerouslySetInnerHTML={{
              __html: item?.workingSummary || 'I have worked here',
            }}
          />
        </div>
      ))}
    </div>
    
    )
  }else{
    return null
  }

 
}
 


export default ProffesionalExperiance