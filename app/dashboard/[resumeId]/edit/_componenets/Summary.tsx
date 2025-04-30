import { ResumeDetails } from '@/types'
import React from 'react'

const Summary = ({resumeInfo}:{resumeInfo:ResumeDetails| undefined}) => {
 
    return (
      <p className="text-xs whitespace-pre-line break-words">
         {resumeInfo?.summary}
      </p>
    )
  }


export default Summary