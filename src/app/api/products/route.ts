import { prisma } from "@/db";
import { Api } from "@/types/Api";
import { isAuthorizedByAdmin } from "@/utils/auth";
import { Prisma } from "@prisma/client";
import { cookies, headers } from "next/headers";
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
  const { description, discountPrice, name, price } =
    (await req.json()) as Api.ProductPayload.POST;

  if (!description || !name) {
    return NextResponse.json({ error: "no data" }, { status: 404 });
  }

  // jwt check start
  const authorization = req.headers.get("authorization");
  console.log(authorization);

  const validUser = isAuthorizedByAdmin(authorization);
  if (!validUser)
    return NextResponse.json({ error: "unauthorize" }, { status: 404 });
  // jwt check end

  const newProduct = await prisma.product.create({
    data: {
      description,
      name,
      price,
      discountPrice,
    },
  });

  const response = NextResponse.json(newProduct, { status: 200 });
  return response;
}
