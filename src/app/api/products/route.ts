import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Get all products
export async function GET(req: NextRequest, gg: any) {
  const { searchParams } = req.nextUrl;

  const skipStr = searchParams.get("skip");
  const takeStr = searchParams.get("take");
  const orderStr = searchParams.get("order") as Prisma.SortOrder;

  const order =
    orderStr == "desc" ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  const orderBy: Prisma.ProductOrderByWithAggregationInput = { id: order };

  const skip: number | undefined = Number(skipStr) || undefined;
  let take: number | undefined = Number(takeStr) || 10;

  if (takeStr === "all") {
    take = undefined;
  }

  const products = await prisma.product.findMany({
    skip: skip,
    take: take,
    orderBy,
  });

  const response = NextResponse.json(products, { status: 200 });
  return response;
}

// create Product
export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.ProductCreateInput;

  const newProduct = await prisma.product.create({ data: data });

  const response = NextResponse.json(newProduct, { status: 200 });
  return response;
}
