import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const varient = await prisma.varient.findUnique({ where: { id: params.id } });

  const response = NextResponse.json(varient, { status: 200 });
  return response;
}

export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const deletedVarient = await prisma.varient.delete({
    where: { id: params.id },
  });

  const response = NextResponse.json(deletedVarient, { status: 200 });
  return response;
}

export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.VarientUpdateInput;
  console.log(data);

  const editedVarient = await prisma.varient.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json(editedVarient, { status: 200 });
  return response;
}
