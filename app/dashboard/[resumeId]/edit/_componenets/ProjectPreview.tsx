import { Project, ResumeDetails } from '@/types'
import React from 'react'

const ProjectPreview = ({resumeInfo}:{resumeInfo:ResumeDetails | undefined}) => {
  if(resumeInfo?.projects && resumeInfo.projects.length>=1){
    return (
      <div className="my-6 break-inside-avoid">
      <h2 className="text-center font-bold text-sm mb-2">Projects</h2>
      <hr className="mb-4" />
      {resumeInfo?.projects?.map((item: Project, index: number) => (
        <div
          key={index}
          className="mb-6 p-4 rounded-md border shadow-sm break-inside-avoid"
          style={{ borderColor: resumeInfo?.themeColor }}
        >
          <h2
            className="text-base font-bold mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            {item?.projectName}
          </h2>
    
          {item.skills && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-800">Skills:</span>
              {item.skills.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold bg-gray-100 px-2 py-[2px] rounded-md text-gray-800"
                  style={{ border: `1px solid ${resumeInfo?.themeColor}` }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}
    
          <div
            className="custom-rich-text text-xs text-gray-700 prose prose-sm"
            dangerouslySetInnerHTML={{
              __html: item?.features || 'No description provided.',
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

export default ProjectPreview