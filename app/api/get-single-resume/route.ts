import { db } from "@/config/db";
import { resumeTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
     const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const resumeId = Number(searchParams.get("resumeId"));
    
        if(!email || !resumeId){
              return NextResponse.json({ error: "Missing 'email' or resumeId query parameter" }, { status: 400 });
    
        }
        try {
            const resume=await db.select().from(resumeTable).where(
                and(
                eq(resumeTable.email,email),
                eq(resumeTable.id,resumeId)
            ))
        
            return NextResponse.json({resume})
        } catch (error) {
            console.error("POST /api/resume error:", error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
        }
   
}