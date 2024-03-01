import { prisma } from "@/db";
import { comparePasswordSync } from "@/utils/auth";
import { Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { configs } from "@/configs/configs";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as User;
  if (!email || !password)
    return NextResponse.json({ error: "credential error" }, { status: 404 });
  console.log("user");

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    return NextResponse.json(
      { error: "credential error email not exist" },
      { status: 404 }
    );
  console.log("user");

  const isValidCredential = comparePasswordSync(password, user.password);

  const validUser = { ...user, password: undefined };
  // JWT section
  const token = jwt.sign(validUser, configs.jwtSecret);
  cookies().set("token", token, { secure: true });

  if (!isValidCredential)
    return NextResponse.json(
      { error: "credential error , password wrong" },
      { status: 404 }
    );

  const response = NextResponse.json(validUser, { status: 200 });

  return response;
}
