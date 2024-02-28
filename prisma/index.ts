import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

// export const prisma = new PrismaClient();
let prismaInstance: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
> | null = null;

export const getPrismaInstance = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};
