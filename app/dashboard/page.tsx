"use client"
import React, { useEffect, useState } from 'react'
import Resume from './_componenets/Resume'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Loading from '../_components/Loading'
import {  ResumeType } from '@/types'
import ResumeItem from './_componenets/ResumeItem'

const Dashboard = () => {
  const{user}=useUser()
  const email=user?.primaryEmailAddress?.emailAddress
  const[loading,setLoading]=useState(false)
  const[resumes,setResumes]=useState<ResumeType[]>([])
  useEffect(()=>{
    email && getResumes()
  },[user])
  const getResumes=async()=>{
    setLoading(true)
    try {
      const result=await axios.get('/api/get-user-resume',{
        params:{email}
      })
      const{resumes}=result.data
      setResumes(resumes)
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

  if(loading){
      return <Loading/>
  }

  
  return (
    <div>
      <h2 className='font-bold text-4xl text-primary'>My Resume</h2>
      <p className='text-xl font-semibold text-gray-500'>Let's Start to create resume for your dream job </p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <Resume/>
        {resumes?.map((resume:ResumeType,index:number)=>(
         <ResumeItem key={index} resume={resume}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard