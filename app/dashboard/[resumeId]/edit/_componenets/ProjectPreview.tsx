import { Project, ResumeDetails } from '@/types'
import React from 'react'

const ProjectPreview = ({ resumeInfo, layout }: { resumeInfo: ResumeDetails | undefined, layout: number }) => {
  if (resumeInfo?.projects && resumeInfo.projects.length >= 1) {
    return (
      <div className="my-6 break-inside-avoid">
        <h2 className={` font-bold text-xl mb-2 ${layout === 1 && 'text-center'} ${layout === 2 && 'text-start'}`}>Projects</h2>
        <hr className="mb-4" />
        {resumeInfo?.projects?.map((item: Project, index: number) => (
          <div
            key={index}
            className={`mb-6 p-4 ${layout === 1 && 'rounded-md border shadow-sm'}  break-inside-avoid `}
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
                <h2 className="text-sm font-semibold text-gray-800">Skills:</h2>
                {item.skills.split(',').map((skill, i) => (
                  <h3
                    key={i}
                    className={`text-xm font-semibold ${layout === 1
                        ? 'bg-gray-100 px-2 py-[2px] rounded-md text-gray-800'
                        : 'border-b pb-[1px]'
                      }`}
                    style={
                      layout === 1
                        ? {
                          border: `1px solid ${resumeInfo?.themeColor}`,
                        }
                        : {
                          color: resumeInfo?.themeColor,
                          borderColor: resumeInfo?.themeColor,
                        }
                    }
                  >
                    {skill.trim()} 
                  </h3>
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
  } else {
    return null
  }

}

export default ProjectPreview