import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./db";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  console.log("I am middleware", req.nextUrl, req.url);

  return NextResponse.redirect(new URL("/home", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
