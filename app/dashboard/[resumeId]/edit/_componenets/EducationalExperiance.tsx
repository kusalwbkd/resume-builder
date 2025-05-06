import { Education, ResumeDetails } from '@/types'
import { Calendar, MapPin } from 'lucide-react'
import React from 'react'

const EducationalExperiance = ({ resumeInfo, layout }: { resumeInfo: ResumeDetails | undefined, layout: number }) => {

  if (resumeInfo?.education && resumeInfo.education.length >= 1) {
    return (
      <div className="my-6 break-inside-avoid">
        <h2 className={` font-bold text-xl mb-2 ${layout === 1 && 'text-center'} ${layout === 2 && 'text-start'}`}>Education</h2>
        <hr className="mb-4" />
        {resumeInfo?.education?.map((item: Education, index: number) => (
          <div
            key={index}
            className={`mb-6 p-4 ${layout === 1 && 'rounded-md border shadow-sm'} break-inside-avoid`}
            style={{ borderColor: resumeInfo?.themeColor }}
          >
            <h2
              className="text-base font-bold mb-1"
              style={{ color: layout === 2 ? 'black' : resumeInfo?.themeColor }}
            >
              {item?.degree} in {item?.fieldOfStudy}
            </h2>
            {layout===2 || layout===3&&
             <div className='flex flex-col'>
             <h3 style={{color:resumeInfo?.themeColor}}>{item?.institutionName}</h3>
             <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs font-medium text-gray-800 mb-1 mt-2">
             
               <span className='flex justify-center items-center gap-1'> <Calendar className='h-4 w-4'
               style={{color:resumeInfo?.themeColor}}
               /> {item?.startDate} - {item?.currentlyStudying ? 'Present' : item?.endDate}</span>
               <span className='flex justify-center items-center gap-1'> <MapPin className='h-4 w-4' 
               style={{color:resumeInfo?.themeColor}}/>{item?.location}</span>
             </div>
           </div>}

            {layout === 1 &&
              <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs font-medium text-gray-800">
                <span>
                  {item?.institutionName}, {item?.location}
                </span>
                <span>
                  {item?.startDate} - {item?.currentlyStudying ? 'Present' : item?.endDate}
                </span>
              </div>}
          </div>
        ))}
      </div>

    )
  } else {
    return null
  }

}

export default EducationalExperiance