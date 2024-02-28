import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Get all varients
export async function GET(req: NextRequest, gg: any) {
  const { searchParams } = req.nextUrl;

  const skipStr = searchParams.get("skip");
  const takeStr = searchParams.get("take");
  const orderStr = searchParams.get("order") as Prisma.SortOrder;

  const order =
    orderStr == "desc" ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  const orderBy: Prisma.VarientOrderByWithAggregationInput = { id: order };

  const skip: number | undefined = Number(skipStr) || undefined;
  let take: number | undefined = Number(takeStr) || 10;

  if (takeStr === "all") {
    take = undefined;
  }

  const varients = await prisma.varient.findMany({
    skip: skip,
    take: take,
    orderBy,
  });

  const response = NextResponse.json(varients, { status: 200 });
  return response;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.VarientCreateInput;

  const newVarient = await prisma.varient.create({ data: data });

  const response = NextResponse.json(newVarient, { status: 200 });
  return response;
}
