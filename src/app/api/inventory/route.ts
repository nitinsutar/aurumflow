import { NextResponse } from "next/server";
import { createInventoryLot } from "@/lib/inventory-service";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function resolveCompanyId(candidate?: string) {
  if (candidate) {
    const company = await prisma.company.findUnique({ where: { id: candidate }, select: { id: true } });
    if (company) return company.id;
  }
  const company = await prisma.company.findFirst({ where: { status: "ACTIVE" }, select: { id: true } });
  return company?.id;
}

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const companyId = await resolveCompanyId(session.companyId);
    if (!companyId) return NextResponse.json({ items: [] });
    const items = await prisma.inventoryItem.findMany({ where: { companyId, deletedAt: null }, orderBy: { createdAt: "desc" }, take: 50, include: { ledgers: { orderBy: { createdAt: "desc" }, take: 1 } } });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load inventory" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const companyId = await resolveCompanyId(session.companyId || body.companyId);
    if (!companyId) return NextResponse.json({ error: "Create a company before adding inventory." }, { status: 400 });
    const item = await createInventoryLot({ companyId, itemName: body.itemName, materialType: body.materialType, purityKarat: body.purityKarat ? Number(body.purityKarat) : undefined, customPurityPct: body.customPurityPct ? Number(body.customPurityPct) : undefined, grossWeight: Number(body.grossWeight || 0), netWeight: Number(body.netWeight || 0), quantity: body.quantity ? Number(body.quantity) : 0, unit: body.unit || "g", batchNumber: body.batchNumber, purchaseRate: Number(body.purchaseRate || 0), storageLocation: body.storageLocation });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create inventory lot" }, { status: 500 });
  }
}
