import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

// get Blog by :id
export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const blog = await prisma.blog.findUnique({ where: { id: params.id } });

  const response = NextResponse.json(blog, { status: 200 });
  return response;
}

// delete Blog by :id
export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const deletedBlog = await prisma.blog.delete({
    where: { id: params.id },
  });

  const response = NextResponse.json(deletedBlog, { status: 200 });
  return response;
}

// update Blog by :id
export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.BlogUpdateInput;
  console.log(data);

  const editedBlog = await prisma.blog.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json(editedBlog, { status: 200 });
  return response;
}
