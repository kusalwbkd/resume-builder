"use client"
import { useResumeProvider } from "@/context/ResumeProvider";
import PersonalDetailsPreview from "./PersonalDetailsPreview";
import Summary from "./Summary";
import ProffesionalExperiance from "./ProffesionalExperiance";
import EducationalExperiance from "./EducationalExperiance";
import SkillsPreview from "./SkillsPreview";
import ProjectPreview from "./ProjectPreview";
import OtherInformationPreview from "./OtherInformationPreview";
import RefreePreview from "./RefreePreview";
import { useEffect, useRef, useState } from "react";
import CoverLetterPreview from "./CoverLetterPreview";

const ResumePreview = ({layout,showCoverLetter}:{layout:number,showCoverLetter:boolean}) => {
  const { resumeInfo } = useResumeProvider();

  const coverLetterId = 'coverLetter';
  const resumeSections = [
    { id: 'personalDetails', component: <PersonalDetailsPreview resumeInfo={resumeInfo} layout={layout}/> },
    { id: 'summary', component: <Summary resumeInfo={resumeInfo} layout={layout}/> },
    { id: 'experience', component: <ProffesionalExperiance resumeInfo={resumeInfo} layout={layout} /> },
    { id: 'education', component: <EducationalExperiance resumeInfo={resumeInfo} layout={layout} /> },
    { id: 'skills', component: <SkillsPreview resumeInfo={resumeInfo} layout={layout}/> },
    { id: 'projects', component: <ProjectPreview resumeInfo={resumeInfo} layout={layout}/> },
    { id: 'other', component: <OtherInformationPreview resumeInfo={resumeInfo} layout={layout}/> },
    { id: 'refree', component: <RefreePreview resumeInfo={resumeInfo} layout={layout}/> },
  ];

  const A4_HEIGHT = 1123;

const PAGE_PADDING = 56; // padding of p-14 = 14*4px = 56
const MAX_CONTENT_HEIGHT = A4_HEIGHT - PAGE_PADDING * 2;

  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [pages, setPages] = useState<React.ReactElement[][]>([]);
  const [coverLetterPage, setCoverLetterPage] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const measureAndPaginate = () => {
      const allPages: React.ReactElement[][] = [];
      let currentHeight = 0;
      let currentPage: React.ReactElement[] = [];

      // Handle cover letter separately
      const coverEl = containerRefs.current[coverLetterId];
      const coverHeight = coverEl?.getBoundingClientRect().height || 0;

      if (coverHeight > 0 &&  showCoverLetter) {
        setCoverLetterPage(<CoverLetterPreview resumeInfo={resumeInfo} />);
      } else {
        setCoverLetterPage(null); // no cover letter
      }

      // Paginate resume sections
      for (const { id, component } of resumeSections) {
        const el = containerRefs.current[id];
        const height = el?.getBoundingClientRect().height || 0;
//currentHeight + height > MAX_CONTENT_HEIGHT && currentPage.length > 0

//currentHeight + height > A4_HEIGHT && currentPage.length > 0
        if (currentHeight + height > MAX_CONTENT_HEIGHT && currentPage.length > 0) {
          allPages.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }

        currentPage.push(component);
        currentHeight += height;
      }

      if (currentPage.length > 0) allPages.push(currentPage);
      setPages(allPages);
    };

    setTimeout(measureAndPaginate, 200);
  }, [resumeInfo]);

  return (
    <div className="print:block print:bg-white print:p-0">
      <div className="flex flex-col items-center gap-5 print:gap-0">
        {/* Hidden measuring section */}
        <div className="invisible absolute left-[-9999px] top-[-9999px] w-[794px] print:hidden">
          {/* Cover Letter for measuring */}
          <div ref={el => {containerRefs.current[coverLetterId] = el}}>
            <CoverLetterPreview resumeInfo={resumeInfo} />
          </div>
          {/* Resume sections for measuring */}
          {resumeSections.map(({ id, component }) => (
            <div key={id} ref={el => {
              containerRefs.current[id] = el;
            }} className="break-inside-avoid">
              {component}
            </div>
          ))}
        </div>

        {/* Render Cover Letter as first page if exists */}
        {coverLetterPage && (
          <div
            className="w-[794px] min-h-[1115px] bg-white p-14 shadow-md print:page-break-after"
            style={{ borderTopWidth: 20, borderColor: resumeInfo?.themeColor }}
          >
            {coverLetterPage}
          </div>
        )}

        {/* Render paginated resume sections */}
        {pages.map((page, index) => (
          <div
            key={index}
            className="w-[794px] min-h-[1115px] bg-white p-14 shadow-md print:shadow-none print:page-break-after"
            style={{ borderTopWidth: 20, borderColor: resumeInfo?.themeColor }}
          >
            {page.map((Component, i) => (
              <div key={i} className="break-inside-avoid page-break-inside-avoid avoid-page-break">
                {Component}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview
