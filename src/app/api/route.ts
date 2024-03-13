import { prisma } from "@/db";
import { Api } from "@/types/Api";
import { isAuthorized } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.url;
  console.log(req.headers, "header");

  // ! jwt check start
  // const authorization = req.headers.get("authorization");
  // console.log(authorization);

  // const validUser = isAuthorized(authorization);
  // if (!validUser)
  //   return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  // ! jwt check end

  const response = NextResponse.json({}, { status: 200 });
  return response;
}
