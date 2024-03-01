import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.url;
  console.log(req.headers, "header");

  const response = NextResponse.json({}, { status: 200 });
  return response;
}
