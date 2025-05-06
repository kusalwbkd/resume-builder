import { ResumeDetails, Skill } from '@/types'
import React from 'react'

const SkillsPreview = ({ resumeInfo, layout }: { resumeInfo: ResumeDetails | undefined, layout: number }) => {

  if (resumeInfo?.skills && resumeInfo?.skills.length >= 1) {
    return (

      <div className="my-6 break-inside-avoid">
        <h2 className={` font-bold text-xl mb-2 ${layout === 1 || layout===3 && 'text-center'} ${layout === 2 && 'text-start'}`}>Skills</h2>
        <hr className="mb-4" />
        <div className="flex flex-wrap gap-3 break-inside-avoid">
          {resumeInfo.skills.map((skill: Skill, index: number) => (
           <div
           key={index}
           className={`text-xs font-bold ${layout===3 &&'flex items-center justify-center'} ${
             layout === 1 ? 'px-4 py-1.5 rounded-full bg-opacity-10' : ''
           } ${layout === 2 ? 'underline decoration-1 underline-offset-6' : ''}`}
           style={{
             color: resumeInfo.themeColor,
             backgroundColor: layout === 1 ? `${resumeInfo.themeColor}20` : 'transparent',
             border: layout === 1 ? `1px solid ${resumeInfo.themeColor}` : 'none',
           }}
         >
           {skill.skillName}
         </div>
         

          ))}
        </div>
      </div>

    )
  } else {
    return null
  }


}

export default SkillsPreview