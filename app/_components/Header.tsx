"use client"
import React from 'react'
import Logo from './Logo'
import {  UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { menuList } from '../dashboard/menulist'
import Link from 'next/link'

const Header = () => {
  const {user}=useUser()
  return (
    <div className='p-3 shadow-md flex justify-between items-center ' id='no-print1'>
      <Logo/>
      <div className='flex items-center md:hidden justify-between gap-2 ml-2'>
      {menuList.map((menu,index)=>{
          return(
            <Link key={index}  href={menu.path}
            className={`cursor-pointer`}>
           
              <h2 className='text-sm'>{menu.name}</h2>

            </Link>
          )
        })}
      </div>
      <div className='flex justify-center items-center gap-3 mx-5'>
      {user&&  <Link className=' cursor-pointer bg-primary rounded-md p-2 text-white' href={'/dashboard'}>Get Started +</Link>}
      <div className='hidden md:flex'>
      <UserButton/>
      </div>
     
      </div>
   
    </div>
  )
}

export default Header