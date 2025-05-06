"use client"
import React, { useEffect, useState } from 'react'
import PersonalDetailsForm from './PersonalDetailsForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
import RefreeForm from './RefreeForm'
import Final from './Final'

const FormSection = ({layout}:{layout:number}) => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const { resumeInfo, setResumeInfo } = useResumeProvider()
  const { user } = useUser()
  const { resumeId } = useParams<{ resumeId: string }>()
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
      const { resume } = result.data
      const res = resume[0]
      setResumeInfo({
        ...resumeInfo,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        themeColor: res.themeColor,
        jobTitle: res.jobTitle,
        linkedIn: res.linkedIn,
        gitHub: res.gitHub,
        website: res.website,
        address: res.address,
        phone: res.phone,
        photo: res.photo,
        summary: res.summary,
        experience: JSON.parse(res.experience),
        education: JSON.parse(res.education),
        skills: JSON.parse(res.skills),
        projects: JSON.parse(res.projects),
        notice_period: res.notice_period,
        languages: res.languages,
        refrees: JSON.parse(res.refrees),
        cover_letter: res.cover_letter
      })
    } catch (error) {
      console.log(error);
    } finally {
      setResumeLoading(false)
    }
  }

  const sectionLabels = [
    "Personal Details",
    "Summary",
    "Professional Experience",
    "Education",
    "Skills",
    "Projects",
    "Other Info",
    "Referees",
    "Final"
  ]

  return (
    <div className="space-y-4">
      {/* Direct Navigation */}
      <div className="flex flex-wrap gap-2">
        {sectionLabels.map((label, index) => (
          <Button
            key={index}
            variant={activeIndex === index + 1 ? "default" : "outline"}
            className='cursor-pointer'
            size="sm"
            onClick={() => setActiveIndex(index + 1)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Theme + Back / Next */}
      <div className="flex justify-between items-center">
        {activeIndex <= 8 && resumeInfo && <ThemeColor />}
        <div className="flex gap-3">
          {activeIndex > 1 && (
            <Button
              className="cursor-pointer"
              onClick={() => setActiveIndex(activeIndex - 1)}
              size="sm"
            >
              <ArrowLeft /> Back
            </Button>
          )}
          {activeIndex <= 8 && (
            <Button
              size="sm"
              className="flex gap-2 cursor-pointer"
              disabled={!enableNext}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* Dynamic Form Content */}
      {activeIndex === 1 && resumeInfo && (
        <PersonalDetailsForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 2 && resumeInfo && (
        <SummaryForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 3 && resumeInfo && (
        <ProfessionalExperianceForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 4 && resumeInfo && (
        <EducationalForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 5 && resumeInfo && (
        <SkillsForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 6 && resumeInfo && (
        <ProjectForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 7 && resumeInfo && (
        <OtherInformationForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 8 && resumeInfo && (
        <RefreeForm {...{ resumeInfo, setResumeInfo, enableNext: setEnableNext, resumeLoading }} />
      )}
      {activeIndex === 9 && <Final layout={layout} />}
    </div>
  )
}

export default FormSection
