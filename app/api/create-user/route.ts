import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  try {
    const { email, userName } = await req.json();

    // Check if the user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (existingUser.length === 0) {
      // Insert new user if not exists
      const dbResult = await db
        .insert(usersTable)
        .values({
          email,
          userName,
        })
        .returning();

      return NextResponse.json({ success: true, dbResult });
    } else {
      // Return existing user or message
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 200 });
    }
  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
