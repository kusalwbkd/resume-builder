import { ResumeType } from '@/types'
import { Notebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ResumeItem = ({ resume }: { resume: ResumeType }) => {
  return (
    <Link href={`/dashboard/${resume?.id}/selectLayout`}>
    <div className="group relative bg-secondary border border-primary rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-1 mx-5 mt-10 cursor-pointer">

      {/* Gradient hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-purple-300/10 to-indigo-300/10 transition duration-300 z-0" />

      <div className="relative flex flex-col items-center justify-center p-10 h-[280px] z-10">
        <Notebook className="w-10 h-10 text-primary group-hover:text-black transition duration-300" />
        <h2 className="text-center mt-6 text-base font-semibold text-gray-800 group-hover:text-black transition">
          {resume?.title || 'Untitled Resume'}
        </h2>
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-primary/10 group-hover:ring-2 group-hover:ring-primary/40 transition z-10" />
    </div>
  </Link>
  )
}

export default ResumeItem