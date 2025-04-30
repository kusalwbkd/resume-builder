import { db } from "@/config/db";
import { resumeTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if(!email){
          return NextResponse.json({ error: "Missing 'email' query parameter" }, { status: 400 });

    }

    const resumes=await db.select().from(resumeTable).where(eq(resumeTable.email,email))
    return NextResponse.json({resumes})
}