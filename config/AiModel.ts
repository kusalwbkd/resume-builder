const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  

  export const generateAboutMe = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          { text: '"Generate an \'About Me\' section for a professional profile.\nDetails:\n\n    Name: John Doe\n\n    Background: Software Engineer with 5+ years of experience\n\n    Expertise: Full-Stack Development, Cloud Infrastructure\n\n    Skills: React, Node.js, AWS, Docker\n\n    Interests: Building scalable systems, mentoring junior developers, open-source contributions.\n\nFollow these instructions:\n\n    Write 3–5 polished sentences.\n\n    Begin with a strong professional introduction.\n\n    Highlight major skills and strengths naturally.\n\n    Maintain a confident and human tone.\n\n    Avoid generic buzzwords unless justified."' },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: 'Highly motivated Software Engineer with over five years of experience specializing in full-stack development and cloud infrastructure. Proficient in building scalable systems using React, Node.js, and AWS, with a strong understanding of Docker for containerization. Passionate about mentoring junior developers and contributing to open-source projects, always seeking opportunities to improve software design and efficiency. My goal is to leverage my expertise to build innovative and impactful solutions.\n' },
        ],
      },
       
    ],
});
   export const generateJobSummary = model.startChat({
      generationConfig,
      history: [
        {
          
          
            role: 'user',
            parts: [
              { text: '"Write a professional and engaging work experience summary for a resume.\n\nDetails to use:\n\n    Job Title: Full Stack Developer\n\n    Job Overview: Responsible for developing scalable web applications, collaborating with cross-functional teams, and ensuring high performance and responsiveness of products.\n\nRequirements:\n\n    Start with a strong introduction that clearly states the role and its importance.\n\n    Highlight key responsibilities, technical skills, and significant contributions.\n\n    Focus on real-world impact or results achieved in the role.\n\n    Maintain a formal, polished tone suitable for professional resumes.\n\n    Keep the summary concise (3–5 sentences).\n\n    Avoid clichés like "hardworking" or "team player" unless clearly demonstrated through actions."' },
            ],
          },
          {
            role: 'model',
            parts: [
              { text: 'Full Stack Developer responsible for architecting and implementing scalable web applications, driving critical features from conception to deployment. Collaborated closely with product, design, and engineering teams to deliver high-performance, responsive user experiences. Key contributions include [mention a specific achievement, e.g., "optimizing database queries to reduce page load times by 30%"] and [mention another achievement, e.g., "leading the development of a new user authentication system using [Specific Technology]"]. Proficient in [list key technologies, e.g., "React, Node.js, AWS, and SQL"], ensuring the stability and efficiency of product offerings.\n' },
            ],
          },
         
      ],
  });

  export const generateProjectSummary = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          { text: 'Write a professional, engaging summary for a project description suitable for a resume or professional profile.\n\nProject Information:\n\n    Project Name: Customer Relationship Management (CRM) System\n\n    Key Skills: Python, Django, REST APIs, PostgreSQL, User Authentication, Agile Methodology\n\n    Project Features:\n\n        Role-based access control\n\n        Contact management system\n\n        Integration with email service for customer outreach\n\n        Real-time reporting and analytics dashboard\n\n        Mobile-responsive design\n\nInstructions:\n\n    Create a concise and engaging summary that highlights the key aspects of the project.\n\n    Use bullet points to present the main features, skills, and outcomes of the project.\n\n    Each bullet should be clear, impactful, and focus on achievements or value created.\n\n    The summary should be ATS-friendly, showcasing the most relevant skills and results.\n\n    Maintain a professional tone, but also ensure the summary feels personal and engaging.\n\n    Focus on specific, quantifiable results and any technical or leadership achievements.\n\n    Avoid unnecessary jargon and keep the language simple yet impactful.\n\nExample Bullet Points:\n\n    Led a team of 4 developers in building a CRM system using Python, Django, and PostgreSQL, enhancing client data management efficiency by 40%.\n\n    Designed and implemented role-based access control, improving security by limiting unauthorized access to sensitive customer data.\n\n    Integrated email service for automated customer outreach, reducing manual communication efforts by 30%.\n\n    Developed real-time reporting and analytics dashboard, providing key stakeholders with actionable insights to improve decision-making.\n\n    Ensured a mobile-responsive design, providing users with seamless access across devices, increasing user engagement by 20%.\n\nEnsure the final result showcases the project\'s value, skills utilized, and the impact on stakeholders.\n' },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: '**Customer Relationship Management (CRM) System**\n\nDeveloped a comprehensive CRM system using Python, Django, and PostgreSQL, designed to streamline customer data management and enhance user engagement. Key project highlights:\n\n*   Spearheaded the design and implementation of role-based access control, bolstering data security and ensuring compliance with privacy regulations.\n*   Integrated an email service to automate customer outreach, resulting in a 30% reduction in manual communication efforts and improved customer engagement.\n*   Engineered a real-time reporting and analytics dashboard, providing stakeholders with actionable insights that led to a 15% improvement in sales conversion rates.\n*   Utilized REST APIs to enable seamless integration with various third-party services, expanding the system\'s functionality and adaptability.\n*   Employed Agile methodologies throughout the development lifecycle, ensuring iterative progress, effective collaboration, and the delivery of a high-quality product.\n' },
        ],
      },
      {
        role: 'user',
        parts: [
          { text: 'Write a professional, engaging summary for a non-technical project description suitable for a resume or professional profile.\n\nProject Information:\n\n    Project Name: Employee Engagement Program\n\n    Key Skills: Project Management, Communication, Team Leadership, Event Planning, Stakeholder Collaboration, Time Management\n\n    Project Features:\n\n        Coordinated company-wide employee wellness programs\n\n        Developed a feedback loop to measure employee satisfaction\n\n        Organized quarterly team-building events\n\n        Implemented recognition and rewards system for high performers\n\n        Collaborated with HR to ensure diversity and inclusion initiatives\n\nInstructions:\n\n    Create a concise and engaging summary that highlights the key aspects of the project.\n\n    Use bullet points to present the main features, skills, and outcomes of the project.\n\n    Each bullet should be clear, impactful, and focus on outcomes and positive results.\n\n    The summary should be ATS-friendly, showcasing the most relevant skills and achievements.\n\n    Maintain a professional tone, but also ensure the summary feels personal and engaging.\n\n    Focus on the project’s impact on employee engagement, morale, and company culture.\n\n    Avoid unnecessary jargon and keep the language simple yet impactful.\n\nExample Bullet Points:\n\n    Spearheaded the development and implementation of a company-wide employee engagement program, improving employee satisfaction scores by 25%.\n\n    Coordinated quarterly team-building events, fostering a more collaborative and positive work environment.\n\n    Established a feedback system that allowed employees to voice concerns, resulting in actionable improvements to workplace policies.\n\n    Launched a recognition and rewards program, motivating top performers and boosting team morale.\n\n    Partnered with HR to ensure diversity and inclusion initiatives were actively promoted within the organization.\n\nEnsure the final result showcases the project’s success, leadership skills, and positive outcomes for the team and organization.\n' },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: '**Employee Engagement Program**\n\nLed the design and execution of a comprehensive employee engagement program focused on fostering a positive and productive work environment. Key project accomplishments include:\n\n*   Championed the implementation of company-wide wellness programs, resulting in a 15% increase in employee participation and improved overall well-being.\n*   Organized quarterly team-building events, significantly enhancing team cohesion and fostering a more collaborative and supportive company culture.\n*   Developed and launched a robust feedback loop to gather employee input, leading to the implementation of new policies that improved employee satisfaction by 20%.\n*   Implemented a recognition and rewards system, motivating top performers and contributing to a measurable increase in team morale and productivity.\n*   Collaborated closely with HR to champion diversity and inclusion initiatives, contributing to a more equitable and inclusive workplace for all employees.\n' },
        ],
      },
       
    ],
});

export const generateCoverLetter = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        { text: 'const aiPrompt = `\nYou are a helpful assistant that writes professional, compelling, and personalized cover letters.\n\nUser Resume Data:\n- Education: [\n    { degree: "BSc in Computer Science", institution: "University of Colombo", year: "2020" }\n]\n- Experience: [\n    { role: "Frontend Developer", company: "NextGen Solutions", duration: "2021–Present", description: "Built responsive UIs using React, improved page speed by 30%, collaborated with designers to implement pixel-perfect interfaces." },\n    { role: "Web Developer Intern", company: "CodeCraft", duration: "2020–2021", description: "Assisted in developing components in Vue.js and optimized accessibility across multiple projects." }\n]\n- Skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Responsive Design"]\n- Projects: [\n    { title: "Portfolio Builder SaaS", description: "Built a web app for users to generate custom portfolio websites using React and Tailwind. Integrated resume and cover letter generation using OpenAI." },\n    { title: "E-Commerce Platform", description: "Developed a full-stack e-commerce site using the MERN stack with cart, checkout, and admin dashboard." }\n]\n\nJob Application Details:\n- Job Title: "Frontend Developer"\n- Company Name: "TechNova"\n- Job Description: "Seeking a skilled frontend developer to craft clean, maintainable code and build user-friendly interfaces in React and Tailwind CSS."\n\nInstructions:\n1. Start with a warm and confident introduction stating the user\'s interest in the role at the company.\n2. Highlight the most relevant professional experiences, education, and technical or soft skills that align with the job description.\n3. Emphasize any projects or achievements from the resume that demonstrate initiative, innovation, leadership, or problem-solving.\n4. Maintain a professional tone that feels human and natural, not robotic or overly formal.\n5. Avoid generic statements — tailor the content specifically to the job role and company, using relevant experiences.\n6. End with a short, polite closing that expresses enthusiasm for an interview opportunity and willingness to contribute.\n\nRequirements:\n- Keep the letter to around 3–4 paragraphs.\n- Focus on clarity, confidence, and relevance — make the candidate stand out.\n- Do not repeat the resume; instead, bring out insights or stories that *support* it.\n\nGenerate only the body of the letter, without formatting like HTML or Markdown.\n`;\n' },
      ],
    },
    {
      role: 'model',
      parts: [
        { text: 'Dear Hiring Manager,\n\nI am writing to express my keen interest in the Frontend Developer position at TechNova, as advertised. Having closely followed TechNova\'s innovative work in [mention a specific area or product of TechNova, if known, otherwise mention general industry work] and with my background in building exceptional user interfaces, I am confident that my skills and experience align perfectly with your needs.\n\nIn my current role as a Frontend Developer at NextGen Solutions, I\'ve honed my skills in React and Tailwind CSS, building responsive and user-friendly interfaces. Notably, I improved page speed by 30% through meticulous code optimization, experience directly applicable to building performant applications. My experience, combined with my solid foundation in computer science from the University of Colombo, allows me to approach frontend development with a well-rounded perspective. My portfolio builder SaaS project showcases my ability to independently develop and implement a complete web application using React and Tailwind, demonstrating my commitment to innovation.\n\nI am particularly drawn to TechNova\'s focus on creating clean, maintainable code. My experience collaborating with designers to implement pixel-perfect interfaces demonstrates my commitment to code quality and user experience. I am enthusiastic about the prospect of contributing to TechNova\'s team, leveraging my skills in React, Next.js, and other technologies to build impactful and engaging user interfaces.\n\nI am eager to learn more about this opportunity and discuss how my skills and experience can benefit TechNova. Thank you for your time and consideration. I look forward to the possibility of an interview.\n' },
      ],
    },
  ],
});

  
  
