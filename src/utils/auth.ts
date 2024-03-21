import { configs } from "@/configs/configs";
import { prisma } from "@/db";
import { JwtUser } from "@/types/jwt";
import { AuthType } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const hashPasswordSync = (myPlaintextPassword: string): string => {
  const saltRounds = configs.saltRounds || 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);

  return hash;
};

export const comparePasswordSync = (
  myPlaintextPassword: string,
  hashPassword: string
): boolean => {
  const isValid = bcrypt.compareSync(myPlaintextPassword, hashPassword);
  return isValid;
};

export const isAuthorizedByAdmin = (
  authorization: string | null
): JwtUser | null => {
  if (!authorization || typeof authorization !== "string") return null;
  const token = authorization.split(" ")[1];

  console.log({ token });

  const user = jwt.verify(token, configs.jwtSecret) as JwtUser;

  const isAdmin = !!user.authType && user.authType === AuthType.ADMIN;

  if (typeof user === "string" || !isAdmin) {
    return null;
  }

  return user;
};
