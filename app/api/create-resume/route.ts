import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { resumeTable, usersTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  try {
    const { email, userName,title } = await req.json();

    const dbResult=await db.insert(resumeTable).values({
        email,
        userName,
        title,
        
    }).returning()

    

      return NextResponse.json({ success: true, dbResult });
     
  } catch (error) {
    console.error("POST /api/resume error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
