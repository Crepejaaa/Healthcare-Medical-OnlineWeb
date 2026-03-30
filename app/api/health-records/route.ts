import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/health-records
// You can pass a user_id via query params to filter: /api/health-records?user_id=123
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    const records = await prisma.healthRecord.findMany({
      where: userId ? { user_id: userId } : undefined,
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { email: true, role: true } }, // Include minimal user details safely
      },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching health records:", error);
    return NextResponse.json(
      { error: "Failed to fetch health records" },
      { status: 500 }
    );
  }
}

// POST /api/health-records
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, symptoms, pain_scale, is_red_flag } = body;

    if (!user_id || !symptoms || pain_scale === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, symptoms, or pain_scale" },
        { status: 400 }
      );
    }

    const newRecord = await prisma.healthRecord.create({
      data: {
        user_id,
        symptoms,
        pain_scale,
        is_red_flag: is_red_flag || false,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating health record:", error);
    return NextResponse.json(
      { error: "Failed to create health record" },
      { status: 500 }
    );
  }
}
