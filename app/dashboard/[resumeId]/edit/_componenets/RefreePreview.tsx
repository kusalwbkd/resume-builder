import { Refree, ResumeDetails } from '@/types'
import { Mail } from 'lucide-react'
import React from 'react'

const RefreePreview = ( {resumeInfo}:{resumeInfo:ResumeDetails | undefined}) => {

  if (resumeInfo?.refrees && resumeInfo?.refrees.length >= 1) {
    return (
      <div className="my-6 break-inside-avoid">
        <h2 className="text-center font-bold text-sm mb-2">References</h2>
        <hr className="mb-4" />
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {resumeInfo.refrees.map((refree: Refree, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-1 min-w-[260px] p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <h2
                className="text-base font-bold"
                style={{ color: resumeInfo.themeColor }}
              >
                {refree?.name}
              </h2>
              <h3 className="text-sm font-semibold text-gray-700">
                {refree?.designation}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{refree?.address}</p>
  
              {refree?.email && (
                <p className="text-xs text-gray-800">
                  <span className="font-semibold">Email:</span> {refree.email}
                </p>
              )}
              {refree?.phone && (
                <p className="text-xs text-gray-800">
                  <span className="font-semibold">Phone:</span> {refree.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return null
  }
  
  
 
}

export default RefreePreview