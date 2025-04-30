"use client"
import React, { useState } from 'react';
import { useResumeProvider } from '@/context/ResumeProvider';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const CoverLetterPage = () => {
  const { resumeInfo,setResumeInfo } = useResumeProvider();
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const[jobTitle,setJobTitle]=useState('')
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  type Params = {
    resumeId: string; 
  };
      const{resumeId}=useParams<Params>()
   
const{user}=useUser()

  const generateCoverLetter = async () => {
    setLoading(true);
    setCoverLetter('');

    try {
      const response = await axios.post('/api/generate-cover-letter', {
        resume:resumeInfo,
        companyName,
        jobDescription,
        jobTitle
      
       
      },{
        headers: {
          "Content-Type": "application/json",
        },
      });

     // const data = await response.json();
      console.log(response.data.coverLetter);
      
      setCoverLetter(response?.data.coverLetter || 'No cover letter generated.');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setCoverLetter('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SavetoDb=async()=>{
    console.log("started");
    
    setLoading(true)
    try {
      const result = await axios.patch('/api/update-resume', {
        email: user?.primaryEmailAddress?.emailAddress,
        resumeId: resumeId,
        cover_letter: coverLetter
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
console.log("result==>",result);

      toast.success("Cover Letter generated");
     // enableNext(true)
    } catch (error) {
      toast.error('Error while updating summary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Generate Your Cover Letter</h1>

      <div>
        <label className="block text-sm font-medium">Company Name (optional)</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Job Title (optional)</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Job Description</label>
        <textarea
          className="w-full mt-1 p-2 border rounded h-40"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <Button
        onClick={generateCoverLetter}
        className=" text-white px-4 py-2 rounded cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </Button>

      {coverLetter && (
        <div className="mt-6 border p-4 bg-gray-50 rounded">
          <h2 className="text-xl font-semibold mb-2">Generated Cover Letter</h2>
          <pre className="whitespace-pre-wrap">{coverLetter}</pre>

          <div className="mt-4 flex gap-4">
          
            <Button 
            type='button'
            disabled={loading}
            onClick={SavetoDb}
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700">
             {loading ? <Loader className='animate-spin' /> : 'Attach to CV'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
