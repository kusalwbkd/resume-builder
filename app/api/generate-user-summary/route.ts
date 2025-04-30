import { generateAboutMe, generateJobSummary } from "@/config/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    
    const{summary,title}=await req.json()
  

const aiPrompt = `Write a professional, engaging "About Me" or user profile summary suitable for a resume or professional profile.

User Information:
- Job Title: ${title}
- Background Details: ${summary}

Instructions:
- Begin with a strong, authentic introduction that captures the user's professional identity based on the Job Title.
- Highlight unique strengths, key skills, technologies, and notable experiences mentioned in the Background Details.
- Maintain a warm but professional tone — confident, approachable, and polished.
- Keep it concise (around 3–5 sentences) while ensuring it feels personal and genuine.
- Avoid buzzwords and vague clichés like "passionate" or "hardworking" unless backed by real examples or context.
- Ensure the summary flows naturally and sounds human, not like a list.
- Focus on showcasing the user's professional value and aspirations subtly.

Make sure the final result feels tailored and impressive.
`;



    try {
        const aiResp=await generateAboutMe.sendMessage(aiPrompt)
        const responseText = JSON.parse(aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text);   // console.log(aiResult);
        return NextResponse.json({ results: responseText })   
    } catch (error) {
        return NextResponse.json({ Error: error })   

    }


}