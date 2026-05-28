import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { recordMaterialReturn } from "@/lib/inventory-service";

export async function POST(request: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await recordMaterialReturn({
    companyId: session.companyId || body.companyId,
    inventoryItemId: body.inventoryItemId,
    jobCardId: body.jobCardId,
    returnedWeight: body.returnedWeight,
    expectedWeight: body.expectedWeight,
    actualReturnWeight: body.actualReturnWeight,
    scrapWeight: body.scrapWeight,
    lossWeight: body.lossWeight
  });
  return NextResponse.json({ ok: true });
}
