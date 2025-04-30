"use params"
import Loading from '@/app/_components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useResumeProvider } from '@/context/ResumeProvider'
import { ResumeDetails } from '@/types'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import { log } from 'node:console'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const PersonalDetailsForm = ({ enableNext ,resumeLoading,resumeInfo,setResumeInfo}: { enableNext: (v: boolean) => void,resumeLoading:boolean 
  resumeInfo:ResumeDetails,
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
}) => {
   type Params = {
      resumeId: string; 
    };
    //const{resumeInfo,setResumeInfo}=useResumeProvider()

   
    useEffect(()=>{
      if(resumeInfo?.email,resumeInfo?.firstName,resumeInfo?.lastName,resumeInfo?.phone,resumeInfo?.photo,resumeInfo?.jobTitle){
        enableNext(true)
   }
    },[resumeInfo?.email,resumeInfo?.firstName,resumeInfo?.lastName,resumeInfo?.phone,resumeInfo?.photo,resumeInfo?.jobTitle]) 
   
   const[fileData,setFileData]=useState<any>()
   const{user}=useUser()
   const{resumeId}=useParams<Params>()
   const[loading,setLoading]=useState(false)
   //const email=user?.primaryEmailAddress?.emailAddress

  

   
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      enableNext(false)
      if (name === 'photo' && files && files[0]) {
        const file = files[0];
        setFileData(file)
        const previewUrl = URL.createObjectURL(file);
    
        setResumeInfo({
          ...resumeInfo,
          photo: previewUrl, // now photo becomes a usable preview URL
        });
      } else {
        setResumeInfo({
          ...resumeInfo,
          [name]: value,
        });
      }
    };
    
    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        let photoUrl = resumeInfo?.photo; // start with the existing one
    
        // 🟡 Only upload to Cloudinary if a new file is selected
        if (fileData) {
          const formData = new FormData();
          formData.append("file", fileData);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
          );
    
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
    
          const data = await res.json();
          photoUrl = data.secure_url; // overwrite only if new image is uploaded
        }
    
        const result = await axios.patch(
          "/api/update-resume",
          {
            email:user?.primaryEmailAddress?.emailAddress,
            firstName: resumeInfo?.firstName,
            lastName: resumeInfo?.lastName,
            jobTitle: resumeInfo?.jobTitle,
            address: resumeInfo?.address,
            phone: resumeInfo?.phone,
            photo: photoUrl,
            resumeId: resumeId,
            linkedIn:resumeInfo?.linkedIn,
            gitHub:resumeInfo?.gitHub,
            website:resumeInfo?.website,
            themeColor:resumeInfo?.themeColor
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("data==>",result);

        const { data } = result;
        const {
          email,
          firstName,
          lastName,
          jobTitle,
          address,
          phone,
          photo,
          id,
          linkedIn,
          gitHub,
          website,
          themeColor
        } = data[0];

        
    
        setResumeInfo({
          ...resumeInfo,
          email,
          firstName,
          lastName,
          jobTitle,
          address,
          phone,
          photo,
          linkedIn,
          gitHub,
          website,
          themeColor
        });
    
        toast.success("Personal details updated");
        enableNext(true);
      } catch (error) {
        console.log(error);
        
        toast.error("Error while updating resume");
      } finally {
        setLoading(false);
      }
    };
    
    if(resumeLoading){
           return<Loading/>
    }
  return (
    <div className='p-8 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal details</h2>
      <p>Geet started with basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm '>First Name</label>
            <Input  name='firstName' required onChange={handleInputChange} value={resumeInfo?.firstName}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>Last Name</label>
            <Input name='lastName' required onChange={handleInputChange} value={resumeInfo?.lastName}/>
         </div>

         <div className='col-span-2'>
            <label className='text-xs md:text-sm'>job Title</label>
            <Input name='jobTitle' required onChange={handleInputChange} value={resumeInfo?.jobTitle}/>
         </div>

         <div className='col-span-2'>
            <label className='text-xs md:text-sm'>Address</label>
            <Input name='address' required onChange={handleInputChange} value={resumeInfo?.address}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>Phone</label>
            <Input name='phone' required onChange={handleInputChange} value={resumeInfo?.phone}/>
         </div>

         <div className='col-span-2 md:col-span-1'> 
            <label className='text-xs md:text-sm'>Email</label>
            <Input name='email' type='email' required onChange={handleInputChange}  value={resumeInfo?.email}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>Github Link</label>
            <Input name='gitHub'  onChange={handleInputChange} value={resumeInfo?.gitHub}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>LinkedIn Link</label>
            <Input name='linkedIn'  onChange={handleInputChange} value={resumeInfo?.linkedIn}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>Website/portfolio Link</label>
            <Input name='website'  onChange={handleInputChange} value={resumeInfo?.website}/>
         </div>

         <div className='col-span-2 md:col-span-1'>
            <label className='text-xs md:text-sm'>Photo</label>
            <Input name='photo' type='file'   onChange={handleInputChange} />
         </div>


        </div>

        <div className='mt-3 flex justify-end'> 
            <Button type='submit' className='cursor-pointer' disabled={loading}>
               {loading? <Loader className='animate-spin'/>:'Save'}
            </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailsForm