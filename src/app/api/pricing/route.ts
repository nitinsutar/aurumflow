import { NextResponse } from "next/server";
import { calculatePricing } from "@/lib/calculations";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(calculatePricing(body));
}
