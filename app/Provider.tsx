"use client"
import { useAuth, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import Header from './_components/Header';
import axios from "axios"
const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const{user}=useUser()
    const pathName=usePathname()
  const notHeaderShown=pathName==='/sign-up'||pathName==='/sign-in'|| pathName.startsWith('/print/');
  
  useEffect(() => {
    user && checkIsNewUser()
  }, [user])





  const checkIsNewUser = async () => {
    const response = await axios.post('/api/create-user',{
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName

    })
    
  }

    
    
  return (
    <div>
       {!notHeaderShown && <Header/>} 
        {children}
    </div>
  )
}

export default Provider