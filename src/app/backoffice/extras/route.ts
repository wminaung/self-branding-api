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

  const orderBy: Prisma.ExtraOrderByWithAggregationInput = { id: order };

  const skip: number | undefined = Number(skipStr) || undefined;
  let take: number | undefined = Number(takeStr) || 10;

  if (takeStr === "all") {
    take = undefined;
  }

  const extras = await prisma.extra.findMany({
    skip: skip,
    take: take,
    orderBy,
  });

  const response = NextResponse.json(extras, { status: 200 });
  return response;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.ExtraCreateInput;

  const newExtra = await prisma.extra.create({ data: data });

  const response = NextResponse.json(newExtra, { status: 200 });
  return response;
}
