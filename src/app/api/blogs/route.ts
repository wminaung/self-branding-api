import { prisma } from "@/db";
import { Api } from "@/types/Api";
import { isAuthorizedByAdmin } from "@/utils/auth";
import { Blog, Prisma } from "@prisma/client";
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
  const { content, title } = (await req.json()) as Api.BlogPayload.POST;

  if (!content || !title)
    return NextResponse.json({ error: "no data" }, { status: 404 });

  // jwt check start
  const authorization = req.headers.get("authorization");
  console.log(authorization);

  const validUser = isAuthorizedByAdmin(authorization);
  if (!validUser)
    return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  // jwt check end

  const newBlog = await prisma.blog.create({
    data: {
      content,
      title,
      userId: validUser.id,
    },
  });

  const response = NextResponse.json(newBlog, { status: 200 });
  return response;
}
