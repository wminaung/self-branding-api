import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const extra = await prisma.extra.findUnique({ where: { id: params.id } });

  const response = NextResponse.json(extra, { status: 200 });
  return response;
}

export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const deletedExtra = await prisma.extra.delete({ where: { id: params.id } });

  const response = NextResponse.json(deletedExtra, { status: 200 });
  return response;
}

export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.ExtraUpdateInput;
  console.log(data);

  const editedExtra = await prisma.extra.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json(editedExtra, { status: 200 });
  return response;
}
