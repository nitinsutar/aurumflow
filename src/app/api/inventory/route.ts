import { NextResponse } from "next/server";
import { createInventoryLot } from "@/lib/inventory-service";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const item = await createInventoryLot({
    companyId: session.companyId || body.companyId,
    itemName: body.itemName,
    materialType: body.materialType,
    purityKarat: body.purityKarat,
    customPurityPct: body.customPurityPct,
    grossWeight: body.grossWeight,
    netWeight: body.netWeight,
    quantity: body.quantity,
    unit: body.unit,
    batchNumber: body.batchNumber,
    purchaseRate: body.purchaseRate,
    storageLocation: body.storageLocation
  });
  return NextResponse.json(item, { status: 201 });
}
