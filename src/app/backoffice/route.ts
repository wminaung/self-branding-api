import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.url;

  const menus = await prisma.menu.findMany();

  const varients = await prisma.varient.findMany();

  const categories = await prisma.category.findMany();

  const usersMenusCategories = prisma.users_Menus_Categories.findMany();

  const extras = await prisma.extra.findMany();

  const menusExtras = await prisma.menus_Extras.findMany();

  const response = NextResponse.json(
    { menus, varients, categories, usersMenusCategories, extras, menusExtras },
    { status: 200 }
  );
  return response;
}
