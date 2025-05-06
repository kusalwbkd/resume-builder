import { ResumeDetails } from '@/types'
import React from 'react'

const Summary = ({resumeInfo,layout}:{resumeInfo:ResumeDetails | undefined,layout:number}) => {
 
    return (
      <div className="my-6 break-inside-avoid">
      <h2 className={`font-bold text-xl mb-2 ${layout === 1 || layout === 3 ? 'text-center' : ''} ${layout === 2 ? 'text-start' : ''}`}>
        Summary
      </h2>
      <hr className="mb-4" />
      <p className="text-xs whitespace-pre-line break-words">
        {resumeInfo?.summary}
      </p>
    </div>
    )
  }


export default Summary