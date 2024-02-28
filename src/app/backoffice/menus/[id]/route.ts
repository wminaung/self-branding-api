import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const menu = await prisma.menu.findUnique({ where: { id: params.id } });

  const response = NextResponse.json({ menu }, { status: 200 });
  return response;
}

export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const deletedMenu = await prisma.menu.delete({ where: { id: params.id } });

  const response = NextResponse.json({ deletedMenu }, { status: 200 });
  return response;
}

export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.MenuUpdateInput;
  console.log(data);

  const editedMenu = await prisma.menu.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json({ editedMenu }, { status: 200 });
  return response;
}
