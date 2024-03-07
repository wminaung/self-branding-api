import { prisma } from "@/db";
import { isAuthorized } from "@/utils/auth";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Slug {
  params: { id: string };
}

// get product by :id
export async function GET(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const product = await prisma.product.findUnique({ where: { id: params.id } });

  const response = NextResponse.json(product, { status: 200 });
  return response;
}

// delete product by :id
export async function DELETE(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  // jwt check start
  const authorization = req.headers.get("authorization");
  console.log(authorization);

  const validUser = isAuthorized(authorization);
  if (!validUser)
    return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  // jwt check end

  const deletedProduct = await prisma.product.delete({
    where: { id: params.id },
  });

  const response = NextResponse.json(deletedProduct, { status: 200 });
  return response;
}

// update product by :id
export async function PUT(req: NextRequest, { params }: Slug) {
  if (!params.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const data = (await req.json()) as Prisma.ProductUpdateInput;
  console.log(data);

  // jwt check start
  const authorization = req.headers.get("authorization");
  console.log(authorization);

  const validUser = isAuthorized(authorization);
  if (!validUser)
    return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  // jwt check end

  const editedProduct = await prisma.product.update({
    where: { id: params.id },
    data: data,
  });

  const response = NextResponse.json(editedProduct, { status: 200 });
  return response;
}
