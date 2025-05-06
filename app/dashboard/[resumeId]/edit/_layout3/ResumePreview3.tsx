"use client";

import { useResumeProvider } from "@/context/ResumeProvider";
import CoverLetterPreview from "../_componenets/CoverLetterPreview";
import Summary from "../_componenets/Summary";
import { useEffect, useRef, useState } from "react";
import SkillsPreview from "../_componenets/SkillsPreview";
import ProjectsPreview from "../_componenets/ProjectPreview";
import ExperiencePreview from "../_componenets/ProffesionalExperiance";
import EducationalExperiance from "../_componenets/EducationalExperiance"
import PersonalDetailsPreview from "../_componenets/PersonalDetailsPreview";
import OtherInformationPreview from "../_componenets/OtherInformationPreview";
import RefreePreview from "../_componenets/RefreePreview";
import FindMeOnline from "../_layout2/FindMeOnline";
import ProfilePhotoComponent from "./ProfilePhotoComponent";

const ResumePreview3 = ({ layout, showCoverLetter }: { layout: number, showCoverLetter: boolean }) => {
    const { resumeInfo } = useResumeProvider();

    const leftSections = [
        { id: "experience", component: <ExperiencePreview resumeInfo={resumeInfo} layout={layout} /> },
        { id: "education", component: <EducationalExperiance resumeInfo={resumeInfo} layout={layout} /> },
        { id: "projects", component: <ProjectsPreview resumeInfo={resumeInfo} layout={layout} /> },
    ];

    const rightSections = [
        // { id: "profilePhoto", component: <ProfilePhotoComponent resumeInfo={resumeInfo} layout={layout} /> },
        { id: "summary", component: <Summary resumeInfo={resumeInfo} layout={layout} /> },
        { id: "skills", component: <SkillsPreview resumeInfo={resumeInfo} layout={layout} /> },
        { id: "languages", component: <OtherInformationPreview resumeInfo={resumeInfo} layout={layout} /> },
        { id: "refree", component: <RefreePreview resumeInfo={resumeInfo} layout={layout} /> },
        { id: "findMe", component: <FindMeOnline resumeInfo={resumeInfo} layout={layout} /> },



    ];

    const A4_HEIGHT = 1123;
    const PAGE_PADDING = 56;
    const MAX_CONTENT_HEIGHT = A4_HEIGHT - PAGE_PADDING * 2;

    const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [pages, setPages] = useState<
        { left: React.ReactElement[]; right: React.ReactElement[] }[]
    >([]);

    const personalDetailsRef = useRef<HTMLDivElement | null>(null);
    const coverLetterRef = useRef<HTMLDivElement | null>(null);
    const [coverLetterPage, setCoverLetterPage] = useState<React.ReactElement | null>(null);

    useEffect(() => {
        const measureAndPaginate = () => {
            const paginatedPages: { left: React.ReactElement[]; right: React.ReactElement[] }[] = [];
            let currentHeight = 0;
            let currentPageLeft: React.ReactElement[] = [];
            let currentPageRight: React.ReactElement[] = [];

            // Handle cover letter
            const coverHeight = coverLetterRef.current?.getBoundingClientRect().height || 0;
            if (coverHeight > 0 && showCoverLetter) {
                setCoverLetterPage(<CoverLetterPreview resumeInfo={resumeInfo} />);
            } else {
                setCoverLetterPage(null);
            }

            // Measure PersonalDetails once (we place it at top of first page)
            const personalDetailsHeight = personalDetailsRef.current?.getBoundingClientRect().height || 0;
            currentHeight += personalDetailsHeight;

            // Paginate left and right sections independently
            const leftCopy = [...leftSections];
            const rightCopy = [...rightSections];

            while (leftCopy.length > 0 || rightCopy.length > 0) {
                let pageLeft: React.ReactElement[] = [];
                let pageRight: React.ReactElement[] = [];
                let maxPageHeight = 0;

                // Fill left column
                while (leftCopy.length > 0) {
                    const section = leftCopy[0];
                    const el = refs.current[section.id];
                    const height = el?.getBoundingClientRect().height || 0;
                    if (maxPageHeight + height > MAX_CONTENT_HEIGHT - (paginatedPages.length === 0 ? personalDetailsHeight : 0)) break;
                    maxPageHeight += height;
                    pageLeft.push(section.component);
                    leftCopy.shift();
                }

                // Fill right column
                let tempHeight = 0;
                for (let i = 0; i < rightCopy.length; i++) {
                    const section = rightCopy[i];
                    const el = refs.current[section.id];
                    const height = el?.getBoundingClientRect().height || 0;
                    if (tempHeight + height > MAX_CONTENT_HEIGHT - (paginatedPages.length === 0 ? personalDetailsHeight : 0)) break;
                    tempHeight += height;
                    pageRight.push(section.component);
                }

                // Remove added right sections from array
                rightCopy.splice(0, pageRight.length);

                paginatedPages.push({ left: pageLeft, right: pageRight });
            }

            setPages(paginatedPages);
        };

        setTimeout(measureAndPaginate, 200);
    }, [resumeInfo]);

    return (
        <div className="print:block print:bg-white print:p-0">
            <div className="flex flex-col items-center gap-5 print:gap-0">

                {/* Hidden measuring elements */}
                <div className="invisible absolute left-[-9999px] top-[-9999px] w-[794px] print:hidden">
                    <div ref={coverLetterRef}>
                        <CoverLetterPreview resumeInfo={resumeInfo} />
                    </div>
                    <div ref={personalDetailsRef}>
                        <PersonalDetailsPreview resumeInfo={resumeInfo} layout={layout} />
                    </div>

                    {[...leftSections, ...rightSections].map(({ id, component }) => (
                        <div key={id} ref={(el) => { refs.current[id] = el }}>{component}</div>
                    ))}
                </div>

                {/* Render cover letter */}
                {coverLetterPage && (
                    <div
                        className="w-[794px] min-h-[1123px] bg-white p-14 shadow-md print:page-break-after"
                        style={{ borderTopWidth: 20, borderColor: resumeInfo?.themeColor }}
                    >
                        {coverLetterPage}
                    </div>
                )}

                {/* Render paginated resume pages */}
                {pages.map((page, idx) => (
                    <div
                        key={idx}
                        className="w-[794px] min-h-[1123px] bg-white p-14 shadow-md print:page-break-after"
                        style={{ borderTopWidth: 20, borderColor: resumeInfo?.themeColor }}
                    >
                        {idx === 0 && (
                            <div className="flex flex-row justify-between gap-6 mb-6 ">
                                <div className="w-[54%]">
                                    <PersonalDetailsPreview resumeInfo={resumeInfo} layout={layout} />
                                </div>
                                <div className="w-[42%] ">
                                    <ProfilePhotoComponent resumeInfo={resumeInfo} layout={layout} />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-row justify-between gap-6 h-full">
                            {/* Left Column */}
                            <div className="flex flex-col w-[48%] gap-4">
                                {page.left.map((comp, i) => (
                                    <div key={i}>{comp}</div>
                                ))}
                            </div>

                            {/* Right Column with Full Background and Centering */}
                            {/* Right Column */}
                            {page.right.length > 0 ? (
                                <div
                                    className="w-[48%] p-4 flex flex-col justify-center items-center gap-4"
                                    style={{
                                        backgroundColor:"#f3f4f6", // Or use resumeInfo?.themeColor
                                        borderRadius: "4px",
                                    }}
                                >
                                    {page.right.map((comp, i) => (
                                        <div key={i} className="w-full">
                                            {comp}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-[48%]" /> // Keeps layout consistent
                            )}

                        </div>



                    </div>
                ))}

            </div>
        </div>
    );
};

export default ResumePreview3;