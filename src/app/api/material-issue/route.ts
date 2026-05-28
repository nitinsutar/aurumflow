import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { issueMaterial } from "@/lib/inventory-service";

export async function POST(request: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const item = await issueMaterial({
    companyId: session.companyId || body.companyId,
    inventoryItemId: body.inventoryItemId,
    jobCardId: body.jobCardId,
    issueWeight: body.issueWeight,
    destination: body.destination,
    adminOverride: process.env.ADMIN_OVERRIDE_NEGATIVE_STOCK === "true"
  });
  return NextResponse.json(item);
}
