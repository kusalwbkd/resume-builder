import { generateCoverLetter } from "@/config/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { resume, companyName, jobDescription, jobTitle } = await req.json()


    const aiPrompt = `
    You are a helpful assistant that writes professional, compelling, and personalized cover letters.
    
    User Resume Data:
    - Education: ${JSON.stringify(resume.education)}
    - Experience: ${JSON.stringify(resume.experience)}
    - Skills: ${JSON.stringify(resume.skills)}
    - Projects: ${JSON.stringify(resume.projects)}
    
    Job Application Details:
    - Job Title: ${jobTitle}
    - Company Name: ${companyName || 'Not specified'}
    - Job Description: ${jobDescription}
    
    Instructions:
    1. Write a professional cover letter body (3–4 paragraphs), starting with a warm and confident introduction.
    2. Focus on relevant experience, skills, education, or projects that align with the job description.
    3. Emphasize measurable achievements, leadership, or initiative when possible.
    4. Do not include personal contact details, the date, salutations like "Sincerely," or the applicant's name.
    5. Do not repeat resume points verbatim—highlight insights, context, or impact behind those details.
    6. Use a human and confident tone, avoiding robotic or overly formal language.
    
    Formatting Requirements:
    - Output only a plain text string, with paragraphs separated by newline characters (\\n).
    - Do not include any HTML or Markdown formatting.
    - Return the output as a **JSON object** using this exact shape:
    
    {
      "cover_letter": "The full cover letter body, with paragraphs separated by \\n"
    }
    
    Do not return anything else—no explanations or other keys.
    `;
    

    try {
        const aiResp = await generateCoverLetter.sendMessage(aiPrompt)
        const coverLetter = aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!coverLetter) {
            return NextResponse.json({ error: 'No cover letter generated.' }, { status: 500 });
        }

        return NextResponse.json({ coverLetter });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error || 'Something went wrong' }, { status: 500 });

    }



}