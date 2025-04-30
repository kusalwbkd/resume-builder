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
    1. Start with a warm and confident introduction stating the user's interest in the role at the company.
    2. Highlight the most relevant professional experiences, education, and technical or soft skills that align with the job description.
    3. Emphasize any projects or achievements from the resume that demonstrate initiative, innovation, leadership, or problem-solving.
    4. Maintain a professional tone that feels human and natural, not robotic or overly formal.
    5. Avoid generic statements — tailor the content specifically to the job role and company, using relevant experiences.
    6. End with a short, polite closing that expresses enthusiasm for an interview opportunity and willingness to contribute.
    
    Requirements:
    - Keep the letter to around 3–4 paragraphs.
    - Focus on clarity, confidence, and relevance — make the candidate stand out.
    - Do not repeat the resume; instead, bring out insights or stories that *support* it.
    
    Output Format:
    Return only a JSON object with this exact shape:
    
    {
      "coverLetter": "Your full cover letter content here as a plain string (no HTML or Markdown)."
    }
    
    Do not include any other text or keys in the response.
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