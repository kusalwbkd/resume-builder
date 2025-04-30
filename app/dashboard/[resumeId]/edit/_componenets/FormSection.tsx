"use client"
import React, { useEffect, useState } from 'react'
import PersonalDetailsForm from './PersonalDetailsForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, PaintBucket } from 'lucide-react'
import SummaryForm from './SummaryForm'
import { useResumeProvider } from '@/context/ResumeProvider'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import axios from 'axios'
import ProfessionalExperianceForm from './ProfessionalExperianceForm'
import EducationalForm from './EducationalForm'
import ThemeColor from './ThemeColor'
import SkillsForm from './SkillsForm'
import ProjectForm from './ProjectForm'
import OtherInformationForm from './OtherInformationForm'
import RefreePreview from './RefreePreview'
import RefreeForm from './RefreeForm'
import Final from './Final'

const FormSection = () => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  type Params = {
    resumeId: string;
  };
  const { resumeInfo, setResumeInfo } = useResumeProvider()

  const { user } = useUser()
  const { resumeId } = useParams<Params>()
  const [resumeLoading, setResumeLoading] = useState(false)
  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId])

  const getResumeInfo = async () => {
    setResumeLoading(true)
    try {
      const result = await axios.get('/api/get-single-resume', {
        params: {
          resumeId,
          email: user?.primaryEmailAddress?.emailAddress
        }
      })
      const { data } = result
      const { resume } = data

      const { email, firstName, lastName, jobTitle, address, phone, photo, id, summary, experience, education,
        linkedIn,
        gitHub,
        website,
        themeColor,
        skills,
        projects,
        notice_period,
        languages,
        refrees,
        cover_letter
      } = resume[0]
      setResumeInfo({
        ...resumeInfo,
        email: email,
        firstName,
        lastName,
        themeColor,
        jobTitle,
        linkedIn,
        gitHub,
        website,
        address,
        phone,
        photo,
        summary,
        experience: JSON.parse(experience),
        education: JSON.parse(education),
        skills: JSON.parse(skills),
        projects: JSON.parse(projects),
        notice_period,
        languages,
        refrees:JSON.parse(refrees),
        cover_letter
      })

    } catch (error) {
      console.log(error);

    } finally {
      setResumeLoading(false)
    }



  }

  return (
    <div>
      <div className='flex justify-between items-center' >
        {activeIndex <= 8 && resumeInfo &&  <ThemeColor />}
       
        <div className='flex gap-3'>
          {activeIndex > 1 && <Button className='cursor-pointer' onClick={() => setActiveIndex(activeIndex - 1)} size={'sm'}><ArrowLeft />Back</Button>}
          {activeIndex <= 8 &&<Button size={'sm'}
            className='flex gap-2 cursor-pointer'
            disabled={!enableNext}
            onClick={() => setActiveIndex(activeIndex + 1)}
          >Next <ArrowRight /></Button>}
        </div>
      </div>
     
      {activeIndex === 1 ? (
        resumeInfo &&
        <PersonalDetailsForm resumeInfo={resumeInfo} 
        setResumeInfo={setResumeInfo}
        enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading} />
      ) : (
        activeIndex === 2 ? (
          resumeInfo&&
          <SummaryForm 
          resumeInfo={resumeInfo} 
          setResumeInfo={setResumeInfo}
          enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading} />
        ) : (
          activeIndex === 3 ? (
              resumeInfo&&
            <ProfessionalExperianceForm 
            resumeInfo={resumeInfo} 
            setResumeInfo={setResumeInfo}
            enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading} />

          ) : (
            activeIndex === 4 ? (
             resumeInfo&&
              <EducationalForm 
              resumeInfo={resumeInfo} 
              setResumeInfo={setResumeInfo}
              enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading} />
            ) : (
              activeIndex === 5 ? (
                resumeInfo&&
                <SkillsForm
                resumeInfo={resumeInfo} 
                setResumeInfo={setResumeInfo}
                enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading} />
              ) : (
                activeIndex === 6 ? (
                  resumeInfo&&
                  <ProjectForm 
                  resumeInfo={resumeInfo} 
                  setResumeInfo={setResumeInfo}
                  enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading}
                  />
                ) : (
                  activeIndex === 7 ? (
                    resumeInfo&&
                    <OtherInformationForm 
                    resumeInfo={resumeInfo} 
                  setResumeInfo={setResumeInfo}
                  enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading}
                    />
                  ) : (
                    activeIndex===8?(
                      resumeInfo && <RefreeForm
                      resumeInfo={resumeInfo} 
                  setResumeInfo={setResumeInfo}
                  enableNext={(v: boolean) => setEnableNext(v)} resumeLoading={resumeLoading}
                      />
                    ):(
                      activeIndex===9?(
                        <Final
                      
                        />
                      ):(
                        null
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )}

    </div>
  )
}

export default FormSection