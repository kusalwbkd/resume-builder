"use client"

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import ResumePreview from './ResumePreview';
import { useCallback, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

const Final = ({layout}:{layout:number}) => {
  console.log("==>",layout);
  
  const router = useRouter();
      type Params = {
          resumeId: string;
      };
      const [loading, setLoading] = useState(false)
      const { resumeId } = useParams<Params>()

  return (
    <>
     
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-5" >
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg text-center space-y-6">
          <h1 className="text-2xl font-bold">What's Next?</h1>
          <p className="text-gray-600">Would you like to generate a cover letter or just download your resume?</p>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full bg-primary cursor-pointer text-white text-lg"
              onClick={() => router.push(`/CoverLetter/${resumeId}?layout=${layout}` )}
            >
              Generate Cover Letter
            </Button>

            <Button
              className="w-full bg-gray-800 hover:bg-gray-900 cursor-pointer text-white text-lg flex items-center justify-center gap-2"
              onClick={()=>router.push(`/print/${resumeId}?layout=${layout}`)}
              
            >
              <Download size={20} />
              Download Resume Only
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Final;
