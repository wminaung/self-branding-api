import { configs } from "@/configs/configs";
import { JwtUser } from "@/types/jwt";
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

export const isAuthorized = (authorization: string | null): JwtUser | null => {
  if (!authorization || typeof authorization !== "string") return null;
  const token = authorization.split(" ")[1];

  console.log({ token });

  const user = jwt.verify(token, configs.jwtSecret) as JwtUser;

  if (typeof user === "string") {
    return null;
  }

  return user;
};
