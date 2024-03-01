import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Get all Blogs
export async function GET(req: NextRequest, gg: any) {
  const { searchParams } = req.nextUrl;

  const skipStr = searchParams.get("skip");
  const takeStr = searchParams.get("take");
  const orderStr = searchParams.get("order") as Prisma.SortOrder;

  const order =
    orderStr == "desc" ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;

  const orderBy: Prisma.BlogOrderByWithAggregationInput = { id: order };

  const skip: number | undefined = Number(skipStr) || undefined;
  let take: number | undefined = Number(takeStr) || 10;

  if (takeStr === "all") {
    take = undefined;
  }

  const blogs = await prisma.blog.findMany({
    skip: skip,
    take: take,
    orderBy,
  });

  const response = NextResponse.json(blogs, { status: 200 });
  return response;
}

// create Blog
export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.BlogCreateInput;

  const newBlog = await prisma.blog.create({ data: data });

  const response = NextResponse.json(newBlog, { status: 200 });
  return response;
}
