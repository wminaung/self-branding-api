import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Get all menus
export async function GET(req: NextRequest, gg: any) {
  const { searchParams } = req.nextUrl;

  const skipStr = searchParams.get("skip");
  const takeStr = searchParams.get("take");
  const orderStr = searchParams.get("order") as Prisma.SortOrder;

  const order =
    orderStr == "desc" ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  const orderBy: Prisma.MenuOrderByWithAggregationInput = { id: order };

  const skip: number | undefined = Number(skipStr) || undefined;
  let take: number | undefined = Number(takeStr) || 10;

  if (takeStr === "all") {
    take = undefined;
  }

  const menus = await prisma.menu.findMany({
    skip: skip,
    take: take,
    orderBy,
  });

  const response = NextResponse.json({ menus }, { status: 200 });
  return response;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.MenuCreateInput;

  const menus = await prisma.menu.create({ data: data });

  const response = NextResponse.json({ menus }, { status: 200 });
  return response;
}
