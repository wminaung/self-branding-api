import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  const response = NextResponse.json(category, { status: 200 });
  return response;
}

export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const deletedCategory = await prisma.category.delete({
    where: { id: params.id },
  });

  const response = NextResponse.json(deletedCategory, { status: 200 });
  return response;
}

export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.CategoryUpdateInput;
  console.log(data);

  const editedCategory = await prisma.category.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json(editedCategory, { status: 200 });
  return response;
}
