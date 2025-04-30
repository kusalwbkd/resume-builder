"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { BrainIcon, Check, Clipboard, Lightbulb, Loader } from 'lucide-react';
import React, { useState } from 'react'
import Editor, { 
    BtnBold, 
    BtnItalic, 
    createButton,
    EditorProvider, 
    Toolbar
  } from 'react-simple-wysiwyg';
import { toast } from 'sonner';

const RichTextEditor = ({onRichEditorChange,item}:any) => {
  const[loading,setLoading]=useState(false)

  const[value,setValue]=useState<any>(item.workingSummary||'')

  const generateSummaray=async()=>{
    setLoading(true)
    try {
      const resp=await axios.post('/api/generate-job-summary',{
        workingSummary:item.workingSummary,
        title:item.titlle       
      })
      toast.info('AI summary generated!')

      // console.log("resp",resp);
      // const aiSummary =  resp.data.results||resp.data.results.work_experience_summary;
      let aiSummary = '';

      if (typeof resp.data.results === 'string') {
        aiSummary = resp.data.results; // If it's directly a string
      } else if (typeof resp.data.results === 'object' && resp.data.results.work_experience_summary) {
        aiSummary = resp.data.results.work_experience_summary; 
      } else {
        throw new Error('Unexpected AI response format');
      }
      setValue(aiSummary);
      //setValue(resp.data.results.work_experience_summary)
      onRichEditorChange({
        target: {
          name: 'workingSummary',  // or whatever field name you expect
          value: aiSummary,
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('error in AI summary generating')
      
    }finally{
      setLoading(false)
    }
   
    
  }
  return (
    <div>
      <div>
        <Button className='flex gap-2 text-primary my-3 cursor-pointer'
         variant={'outline'}
         disabled={loading }
         onClick={generateSummaray}
         >
          {loading ? <><Loader className='animate-spin'/> Generating... </>  : <><BrainIcon/> Generate with AI</> }
          </Button>
          
         <div className="bg-amber-50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm my-3">
                         <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                           <Lightbulb className="text-amber-500" />
                           Tips for Writing a Great Summary
                         </h2>
                       
                         <div className="flex items-start gap-3 text-sm text-gray-700">
                           <Clipboard className="mt-1 text-amber-500" />
                           <span>
                             Include your <span className="font-medium">title</span>, key <span className="font-medium">responsibilities</span>,
                             <span className="font-medium"> technical skills</span>, and <span className="font-medium">notable achievements</span>.
                             Focus on real impact!
                           </span>
                         </div>
                       
                         <div className="flex items-start gap-3 text-sm text-gray-700">
                           <Check className="mt-1 text-green-500" />
                           <span>
                             After generating, <span className="font-medium">customize and polish</span> your text to best reflect your role and strengths.
                           </span>
                         </div>
                          </div>
        
        
      </div>
        <EditorProvider >
        <Editor 
        
        value={value} onChange={(e)=>{
          setValue(e.target.value)
          onRichEditorChange(e)
          }}
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            minHeight: '200px', // 👈 Optional: better UX
            padding: '1rem',    // 👈 Optional: for nice spacing
            border: '1px solid #111', // 👈 Optional: nice border
            borderRadius: '0.5rem'
          }}
          >

        </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor