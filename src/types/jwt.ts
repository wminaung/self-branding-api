import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface JwtUser extends User, jwt.JwtPayload {}
