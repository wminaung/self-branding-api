import { prisma } from "@/db";
import { Blog, Prisma, PrismaClient, Product, User } from "@prisma/client";

export namespace Api {
  export namespace BlogPayload {
    export interface POST extends Omit<Partial<Blog>, "userId" | "id"> {}
    export interface PUT extends Omit<Partial<Blog>, "userId" | "id"> {}
  }

  export namespace ProductPayload {
    export interface POST extends Omit<Partial<Product>, "userId" | "id"> {}
    export interface PUT extends Omit<Partial<Product>, "userId" | "id"> {}
  }
  export namespace UserPayload {
    export interface POST extends Omit<Partial<User>, "userId" | "id"> {}
  }
}
