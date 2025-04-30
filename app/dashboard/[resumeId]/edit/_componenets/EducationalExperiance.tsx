import { Education, ResumeDetails } from '@/types'
import React from 'react'

const EducationalExperiance = ({resumeInfo}:{resumeInfo:ResumeDetails | undefined}) => {

    if(resumeInfo?.education && resumeInfo.education.length>=1){
        return (
            <div className="my-6 break-inside-avoid">
  <h2 className="text-center font-bold text-sm mb-2">Educational Qualifications</h2>
  <hr className="mb-4" />
  {resumeInfo?.education?.map((item: Education, index: number) => (
    <div
      key={index}
      className="mb-6 p-4 rounded-md border shadow-sm break-inside-avoid"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <h2
        className="text-base font-bold mb-1"
        style={{ color: resumeInfo?.themeColor }}
      >
        {item?.degree} in {item?.fieldOfStudy}
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs font-medium text-gray-800">
        <span>
          {item?.institutionName}, {item?.location}
        </span>
        <span>
          {item?.startDate} - {item?.currentlyStudying ? 'Present' : item?.endDate}
        </span>
      </div>
    </div>
  ))}
</div>

        )
    }else{
        return null
    }
  
}

export default EducationalExperiance