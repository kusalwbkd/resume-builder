"use client"
import { Input } from '@/components/ui/input';
import { Project, ResumeDetails } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor';
import RichTextEditorForProject from './RichTextEditorForProject';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const ProjectForm = (
    { enableNext, resumeLoading, resumeInfo, setResumeInfo }: {
        enableNext: (v: boolean) => void, resumeLoading: boolean
        resumeInfo: ResumeDetails,
        setResumeInfo: React.Dispatch<React.SetStateAction<ResumeDetails>>
    }
) => {
    const formField: Project = {
        projectName: '',
        skills: '',
        features: ''

    }

    type Params = {
        resumeId: string;
    };
    const [loading, setLoading] = useState(false)
    const { resumeId } = useParams<Params>()

    const [projectsList, setProjectsList] = useState<any>(resumeInfo?.projects || [formField])
    const { user } = useUser()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        const updatedList = [...projectsList];
        updatedList[index] = { ...updatedList[index], [name]: value };

        setProjectsList(updatedList);

        setResumeInfo({
            ...resumeInfo,
            projects: updatedList,
        });

    };


    const addMoreProjects = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setProjectsList([...projectsList, formField])
    }

    const removeProject = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const updatedList = projectsList.slice(0, -1); // ✅ updated array
        setProjectsList(updatedList);
        setResumeInfo({
            ...resumeInfo,
            experience: updatedList
        })
        toast.error('Experiance removed')
        //setExperianceList(updatedList)

    }

    const handleRichTextEditor = (e: React.ChangeEvent<HTMLInputElement>, Name: string, index: number) => {
        // e.preventDefault()

        const { name, value } = e.target;
        const updatedList = [...projectsList];
        updatedList[index] = { ...updatedList[index], [Name]: value };
        setProjectsList(updatedList);

        setResumeInfo({
            ...resumeInfo,
            projects: updatedList,
        });



    }

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.patch('/api/update-resume', {
                email:user?.primaryEmailAddress?.emailAddress,
                resumeId: resumeId,
                projects: JSON.stringify(projectsList)
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

            const { data } = result;
            const {
                projects
            } = data[0];

            setResumeInfo({
                ...resumeInfo,
                projects: JSON.parse(projects)
            });

            toast.success("project data updated");
            enableNext(true)
        } catch (error) {
            toast.error('Error while updating project data')
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Projects</h2>
                <p>Add your Projects</p>
                <form onSubmit={onSave}>
                    {projectsList?.map((item: any, index: number) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 rounded-lg border p-3 my-5'>
                                <div className='col-span-2'>
                                    <label className='text-xs'>Project Name</label>
                                    <Input name='projectName' value={item.projectName} onChange={(e) => handleChange(e, index)} />
                                </div>

                                <div className='col-span-2'>
                                    <label className='text-xs'>Technologies/Skills used</label>
                                    <Input name='skills'
                                        onChange={(e) => handleChange(e, index)}
                                        placeholder='Add skills seperated by , ex:react,node' value={item.skills} />
                                </div>


                                <div className='col-span-2'>
                                    <RichTextEditorForProject
                                        onRichEditorChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRichTextEditor(e, 'features', index)}
                                        item={item}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-between items-center'>
                        <Button type='button' variant={'outline'} className='text-primary font-semibold cursor-pointer border-primary'
                            onClick={(e: any) => addMoreProjects(e)}
                        >+ Add more</Button>
                        {projectsList.length > 1 &&
                            <Button type='button' variant={'outline'} className='text-destructive font-semibold cursor-pointer border-destructive '
                                onClick={(e: any) => removeProject(e)}
                            > - Remove Experiance</Button>}
                    </div>
                    <div className='flex justify-end mt-5'>
                        <Button type='submit' className='cursor-pointer' disabled={loading}>
                            {loading ? <Loader className='animate-spin' /> : 'Save'}
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm