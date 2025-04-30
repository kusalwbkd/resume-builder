"use client"

import { ResumeDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { dummyResume } from "@/app/dashboard/data";

type ResumeContextType = {
  resumeInfo: ResumeDetails | undefined;
 // setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails | undefined>>;
 setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>;
};

const defaultResumeInfo: ResumeDetails = {
  email: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  address: '',
  phone: '',
  photo: '',
  summary:'',
  experience:[],
  skills:[],
  projects:[],
  refrees:[],
  notice_period:'',
  languages:'',
  linkedIn:'',
  gitHub:'',
  website:'',
  education:[],
  themeColor:'',
  cover_letter:''
  
  
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider=({children}:{
   
    children: React.ReactNode;
  })=>{
    const[resumeInfo,setResumeInfo]=useState<ResumeDetails>(defaultResumeInfo)

    useEffect(()=>{
          // setResumeInfo(dummyResume)
    },[])
    return(
        <ResumeContext.Provider value={{
            resumeInfo,setResumeInfo
        }}>
           {children}
        </ResumeContext.Provider>
    )
}  

export const useResumeProvider = () => {
    const context = useContext(ResumeContext);
    if (!context) {
      throw new Error("useResumeProvider must be used within a ResumeProvider");
    }
    return context;
  };