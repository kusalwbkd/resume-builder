import { ResumeDetails } from '@/types'
import { Globe } from 'lucide-react'
import React from 'react'

const FindMeOnline = ({ resumeInfo,layout }: { resumeInfo: ResumeDetails| undefined,layout:number}) => {
  return (
    <div className="my-6 break-inside-avoid">
    <h2 className={` font-bold text-xl mb-2 ${layout === 1 || layout===3&& 'text-center'} ${layout === 2 && 'text-start'}`}>
        Find me on  Online
    </h2>
    <hr className="mb-4" />
    <div className='flex flex-col justify-center gap-2'>
        {resumeInfo?.linkedIn &&
        <>
          <h2 className='flex gap-3 text-center font-bold'><Globe style={{color:resumeInfo?.themeColor}}/> LinkedIn
       
       </h2>

       <h3 className='text-gray-600'>  {resumeInfo?.linkedIn}</h3>
        </>
      }

      {resumeInfo?.gitHub &&
        <>
        <h2 className='flex gap-3 text-center font-bold'><Globe style={{color:resumeInfo?.themeColor}}/> GitHub
       
        </h2>
        <h3 className='text-gray-600'>  {resumeInfo?.gitHub}</h3>
        </>}
        
        {resumeInfo?.website&&
        <>
        <h2 className='flex gap-3 text-center font-bold'><Globe style={{color:resumeInfo?.themeColor}}/> Website
       
        </h2>
        <h3 className='text-gray-600'>  {resumeInfo?.website}</h3>
        </>}
    </div>
    </div>
  )
}

export default FindMeOnline