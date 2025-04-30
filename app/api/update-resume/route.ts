import { db } from "@/config/db";
import { resumeTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest) {
    const body = await req.json();

const updateData: Partial<typeof resumeTable> = {};

if (body.firstName !== undefined) updateData.firstName = body.firstName;
if (body.lastName !== undefined) updateData.lastName = body.lastName;
if (body.jobTitle !== undefined) updateData.jobTitle = body.jobTitle;
if (body.email !== undefined) updateData.email = body.email;

if (body.linkedIn !== undefined) updateData.linkedIn = body.linkedIn;
if (body.gitHub !== undefined) updateData.gitHub = body.gitHub;
if (body.website !== undefined) updateData.website = body.website;

if (body.address !== undefined) updateData.address = body.address;
if (body.phone !== undefined) updateData.phone = body.phone;
if (body.photo !== undefined) updateData.photo = body.photo;
if (body.summary !== undefined) updateData.summary = body.summary;
if (body.experience !== undefined) updateData.experience = body.experience;
if (body.education !== undefined) updateData.education = body.education;
if (body.themeColor !== undefined) updateData.themeColor = body.themeColor;
if (body.skills !== undefined) updateData.skills = body.skills;
if (body.projects !== undefined) updateData.projects = body.projects;
if (body.refrees !== undefined) updateData.refrees = body.refrees;

if (body.languages !== undefined) updateData.languages = body.languages;
if (body.notice_period !== undefined) updateData.notice_period = body.notice_period;
if (body.cover_letter !== undefined) updateData.cover_letter = body.cover_letter;



    try {
        const dbResult=await db.update(resumeTable).set(updateData).where(
            and(
                eq(resumeTable.email,body.email),
                eq(resumeTable.id,body.resumeId)
            )
        ).returning()
        return NextResponse.json(dbResult)
    } catch (error) {
        console.error("POST /api/resume error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }


}