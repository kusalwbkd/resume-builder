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

const RichTextEditorForProject = ({ onRichEditorChange, item }: any) => {
    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState<any>(item.features || '')

    const generateProjectFeatures = async () => {
        setLoading(true)
        try {
            const resp = await axios.post('/api/generate-project-features', {
                skills: item.skills,
                projectName: item.projectName,
                features: item.features
            })
            toast.info('project features generated!')

            let aiSummary = resp.data.results;;


         

            const aiSummaryString = Array.isArray(aiSummary) ? aiSummary.join('\n') : aiSummary;

            const formattedSummary = aiSummaryString
                .split('\n') // Split the summary by line breaks
                .map((item: any) => {
                    // Remove the leading "- " and bold any percentage values
                    let formattedItem = item.replace(/^-\s*/, ''); // Remove the "- " at the start of each item
                    formattedItem = formattedItem.replace(/\[\d+%\]/g, (match: any) => `<strong>${match}</strong>`); // Bold the percentage values
                    return formattedItem;
                })
                .join('\n');

            setValue(formattedSummary)
            onRichEditorChange({
                target: {
                    name: 'features',  // or whatever field name you expect
                    value: formattedSummary,
                }
            });
        } catch (error) {
            console.log(error);
            toast.error('error in AI project summnary generating')

        } finally {
            setLoading(false)
        }


    }
    return (
        <div>
            <div>
                <Button className='flex gap-2 text-primary my-3 cursor-pointer'
                    variant={'outline'}
                    disabled={loading}
                    onClick={generateProjectFeatures}
                >
                    {loading ? <><Loader className='animate-spin' /> Generating... </> : <><BrainIcon /> Generate with AI</>}
                </Button>

                <div className="bg-amber-50 rounded-2xl p-5 flex flex-col gap-4 shadow-sm my-3">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                        <Lightbulb className="text-amber-500" />
                        Tips for Writing ATS-Friendly Project Features
                    </h2>

                    <div className="flex items-start gap-3 text-sm text-gray-700">
                        <Clipboard className="mt-1 text-amber-500" />
                        <span>
                            Whether your project is technical or non-technical, focus on key <span className="font-medium">objectives</span>
                            achieved, <span className="font-medium">skills</span> demonstrated (e.g., project management, communication, leadership),
                            and the <span className="font-medium">impact</span> it had on the team or organization.
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="mt-1 text-green-500" />
                        <span>
                            For non-technical projects (e.g., HR management, marketing campaigns), focus on the <span className="font-medium">challenges</span>
                            faced, your <span className="font-medium">problem-solving approach</span>, and how you <span className="font-medium">managed</span>
                            resources or teams. These skills are equally valuable and will help you stand out to employers.
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-gray-700">
                        <Clipboard className="mt-1 text-amber-500" />
                        <span>
                            <span className="font-medium">Enter key facts</span> about your project, such as objectives, goals, challenges,
                            and outcomes. The AI will help generate a concise ATS-friendly description based on the information provided.
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="mt-1 text-green-500" />
                        <span>
                            After AI generation, <span className="font-medium">review and refine</span> the content:
                            replace placeholders (e.g., <span className="italic">[X%]</span>, <span className="italic">[Y number]</span>),
                            format bullet points if needed, and personalize it to match your project's actual results and style.
                        </span>
                    </div>
                </div>




            </div>
            <EditorProvider >
                <Editor
                    value={value} onChange={(e) => {
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

export default RichTextEditorForProject