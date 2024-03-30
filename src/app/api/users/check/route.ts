import { prisma } from "@/db";
import { Api } from "@/types/Api";
import { isAuthorizedByAdmin } from "@/utils/auth";
import { Prisma } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Get all products

// create Product
export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as Api.UserPayload.POST;

  if (!email) {
    return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const response = NextResponse.json(user, { status: 200 });
  return response;
}
