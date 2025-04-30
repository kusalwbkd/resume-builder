import { generateJobSummary } from "@/config/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    
    const{workingSummary,title}=await req.json()
    const aiPrompt = `Write a professional and engaging work experience summary for a resume.

    Details to use:
    - Job Title: ${title}
    - Job Overview: ${workingSummary}
    
    Requirements:
    - Start with a strong introduction clearly stating the role and its importance.
    - Highlight key responsibilities, technical skills, and significant contributions.
    - Focus on real-world impact or results achieved in the role.
    - Maintain a formal, polished tone suitable for professional resumes.
    - Keep the summary concise (around 3–5 sentences).
    - Avoid generic clichés like "hardworking" or "team player" unless shown through actions.
    
    Important:
    Return ONLY the following JSON format:
    {
      "work_experience_summary": "Your final summary here as a single string."
    }
    
    Do not include any extra commentary, notes, or formatting. Return only the JSON object.`;
    

    try {
        const aiResp=await generateJobSummary.sendMessage(aiPrompt)
        const responseText = JSON.parse(aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text);   // console.log(aiResult);
        return NextResponse.json({ results: responseText })   
    } catch (error) {
        return NextResponse.json({ Error: error })   

    }


}