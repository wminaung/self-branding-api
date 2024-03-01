import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { hashPasswordSync } from "@/utils/auth";
import { prisma } from "@/db";

// register page
export async function POST(req: NextRequest) {
  try {
    let { name, email, password, username, image } =
      (await req.json()) as Prisma.UserCreateInput;

    if (!email || !password || !name)
      return NextResponse.json(
        { error: "email,name or password is needed" },
        { status: 404 }
      );

    const isEmailExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailExist)
      return NextResponse.json(
        { error: "user already exist" },
        { status: 404 }
      );

    if (!username) {
      username = name.toLowerCase().replaceAll(" ", "_");
      console.log("replace username : ", username);
    }

    const hashPassword = hashPasswordSync(password.toString());

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        username: username,
        name: name,
        image: image,
      },
    });

    const response = NextResponse.json(
      { ...user, password: "undefined" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error, in: " catch () " },
      { status: 404 }
    );
  }
}
