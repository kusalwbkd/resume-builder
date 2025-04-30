import { ResumeDetails, Skill } from '@/types'
import React from 'react'

const SkillsPreview = ({resumeInfo}:{resumeInfo:ResumeDetails | undefined}) => {

  if (resumeInfo?.skills && resumeInfo?.skills.length >= 1) {
    return (
    
      <div className="my-6 break-inside-avoid">
  <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
  <hr className="mb-4" />
  <div className="flex flex-wrap gap-3 break-inside-avoid">
    {resumeInfo.skills.map((skill: Skill, index: number) => (
      <div
        key={index}
        className="px-4 py-1.5 rounded-full text-xs font-bold bg-opacity-10"
        style={{
          color: resumeInfo.themeColor,
          backgroundColor: `${resumeInfo.themeColor}20`, // light tint of themeColor
          border: `1px solid ${resumeInfo.themeColor}`,
        }}
      >
        {skill.skillName}
      </div>
    ))}
  </div>
</div>

    )
  }else{
    return null
  }
  
 
}

export default SkillsPreview