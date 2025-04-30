export type ResumeType = {
    id: number;
    title: string;
    email: string;
    userName: string;
    createdAt: Date | null; // depending on whether timestamp is nullable
  };
  export type Experience = {
    id?: string;
    companyName?: string;
    location?: string;
    title?: string;
    workingSummary?: string;
    currentlyWorking?: boolean;
    startDate?: string;
    endDate?: string;
  };
  export type Education = {
    id?: string;
    institutionName?: string;
    location?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    currentlyStudying?: boolean;

  };
  
  export type Skill = {
    id?: string;
    skillName?: string;
    rating?:number
  };

  export type Project={
    projectName?:string,
    skills?:string,
    features?:string
  }

  export type Refree={
    name?:string,
    email?:string,
    address?:string,
    designation?:string,
    phone?:string
  }
  
  export type ResumeDetails = {
   // id:number,
    firstName?: string;
    lastName?: string;
    address?: string;
    email?: string;
    photo?:string;
    phone?: string;
    jobTitle?: string;
    themeColor?: string;
    gitHub?:string,
    linkedIn?:string,
    website?:string,
    summary?: string;
    experience?: Experience[];
    skills?: Skill[];
    education?: Education[]; // 👈 Add this line
    projects?:Project[]
    languages?:string
    notice_period?:string,
    refrees?:Refree[]
    cover_letter?:string,


  };
  