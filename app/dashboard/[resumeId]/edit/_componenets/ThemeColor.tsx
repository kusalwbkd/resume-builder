import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PaintBucket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResumeProvider } from '@/context/ResumeProvider';


const ThemeColor = () => {
  const { resumeInfo, setResumeInfo } = useResumeProvider()
  
  const colors = [
    '#000000', // Black
    '#1A1A1A', // Very dark gray (almost black)
    '#2C3E50', // Dark blue-gray
    '#34495E', // Slightly lighter dark blue
    '#4B5563', // Cool dark gray (Tailwind slate-600)
    '#374151', // Dark slate (Tailwind gray-700)
    '#3B82F6', // Soft blue (Tailwind blue-500)
    '#2563EB', // Deeper blue
    '#10B981', // Emerald green (Tailwind green-500)
    '#14B8A6', // Teal (Tailwind teal-500)
    '#6366F1', // Indigo (Tailwind indigo-500)
    '#F59E0B', // Amber/gold (Tailwind amber-500)
    '#D97706', // Deeper amber
    '#E11D48', // Rose (Tailwind rose-600)
    '#DC2626', // Strong red (Tailwind red-600)
    '#6B7280', // Neutral gray (Tailwind gray-500)
  ];

  
  return (
    <Popover>
    <PopoverTrigger asChild>
    <Button className='flex gap-2 cursor-pointer'  variant={'outline'} size={'sm'}>
      <PaintBucket/>Theme</Button>
    </PopoverTrigger>
    <PopoverContent>
      <div className='grid grid-cols-5 gap-3'>
      {colors.map((color:string,index:number)=>(
        <div className='rounded-full h-5 w-5 cursor-pointer'
        style={{backgroundColor:color}}
        key={index}
        onClick={()=>{
          setResumeInfo({
            ...resumeInfo,
          
            themeColor:color
          })
        }}
        ></div>
      ))}
      </div>
    </PopoverContent>
  </Popover>
  
  )
}

export default ThemeColor