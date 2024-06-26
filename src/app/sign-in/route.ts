import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.url;
  const response = NextResponse.json({ path }, { status: 200 });

  return response;
}
