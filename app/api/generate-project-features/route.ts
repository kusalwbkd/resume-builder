import { generateAboutMe, generateJobSummary, generateProjectSummary } from "@/config/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const{projectName,skills,features}=await req.json()
  
    const aiPrompt = `Write a professional, engaging, and consistent summary for a non-technical project description suitable for a resume or professional profile.

    Project Information:
    - Project Name: ${projectName}
    - Key Skills: ${skills}
    - Project Features: ${features}
    
    Instructions:
    - Generate exactly **5 bullet points** that clearly present the key aspects of the project.
    - Each bullet point should focus on one of the following:
      1. A key achievement or result, with a measurable impact (e.g., “increased efficiency by [X%]”).
      2. The skills and technologies used in the project (e.g., **${skills}**).
      3. The impact the project had on the organization, team, or stakeholders (e.g., “improved customer satisfaction by [Y%]”).
      4. Leadership or coordination roles taken during the project (e.g., “led a team of [Z people]”).
      5. Specific measurable outcomes or metrics, such as cost savings or process improvements.
      
    - Ensure that the bullet points are **clear**, **impactful**, and **quantifiable** wherever possible.
    - Use placeholders for any missing statistics (e.g., **[X%]**, **[Y number]**, **[Z%]**) to allow for customization.
    - Maintain a professional, ATS-friendly tone while keeping the language simple and easy to understand.
    - Do **not** provide any introductory paragraphs or extra sections—just the **5 bullet points**. Each bullet should stand alone and provide clear value.
      
    The bullet points should be formatted like this:
    - Achieved **[X%]** improvement in **[project outcome]**, leading to **[impact]**.
    - Utilized **${skills}** to streamline processes, resulting in **[Z%]** increase in efficiency.
    - Successfully developed key features like **${features}**, improving user experience by **[B%]**.
    - Led a team of **[X people]** to achieve **[Y%]** improvement in **[outcome]**.
    - Coordinated with cross-functional teams to drive **[D%]** increase in customer satisfaction.
    
    Ensure the response contains **only bullet points**—no summaries, introductions, or conclusions. The bullets should focus on achievements, measurable outcomes, and specific contributions to the project.`;
    
    

    try {
        const aiResp=await generateProjectSummary.sendMessage(aiPrompt)
        const responseText = JSON.parse(aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text);   // console.log(aiResult);
        return NextResponse.json({ results: responseText })   
    } catch (error) {
        return NextResponse.json({ Error: error })   

    }


}