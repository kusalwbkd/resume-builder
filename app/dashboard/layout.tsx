import React from 'react'
import Dashboard from './page';
import Sidebar from './_componenets/Sidebar';
import { ResumeProvider } from '@/context/ResumeProvider';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
   
    <div>
{/*    <div className='md:w-64 hidden md:block fixed'>
        <Sidebar />
    </div>  */}
     {/* <div className='md:ml-64'>  */}
       <div>
        <div className='p-10'>
            {children}
        </div>
    </div>
    {/* </div> */}
</div>
  )
}

export default layout