import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
export async function GET(req: Request) {
  const path = req.url;

  const data = readFileSync(".env", "utf-8");

  const response = NextResponse.json({ path, data }, { status: 200 });

  return response;
}

// export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'
