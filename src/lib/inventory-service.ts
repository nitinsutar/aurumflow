import { canIssueStock, fineMetalEquivalent, wastage } from "@/lib/calculations";
import { prisma } from "@/lib/prisma";

export async function createInventoryLot(input: {
  companyId: string;
  itemName: string;
  materialType: "GOLD" | "SILVER" | "PLATINUM" | "DIAMOND" | "GEMSTONE" | "PEARL" | "FINDING" | "ACCESSORY";
  purityKarat?: number;
  customPurityPct?: number;
  grossWeight: number;
  netWeight: number;
  quantity?: number;
  unit?: string;
  batchNumber: string;
  purchaseRate: number;
  storageLocation?: string;
  userId?: string;
}) {
  const fineEquivalent = fineMetalEquivalent(input.netWeight, input.purityKarat, input.customPurityPct);
  return prisma.$transaction(async (tx) => {
    const item = await tx.inventoryItem.create({
      data: {
        companyId: input.companyId,
        itemName: input.itemName,
        materialType: input.materialType,
        purityKarat: input.purityKarat,
        customPurityPct: input.customPurityPct,
        grossWeight: input.grossWeight,
        netWeight: input.netWeight,
        fineEquivalent,
        quantity: input.quantity ?? 0,
        unit: input.unit ?? "g",
        batchNumber: input.batchNumber,
        purchaseRate: input.purchaseRate,
        currentValue: input.netWeight * input.purchaseRate,
        storageLocation: input.storageLocation
      }
    });
    await tx.inventoryLedger.create({
      data: {
        companyId: input.companyId,
        inventoryItemId: item.id,
        movementType: "PURCHASE",
        inwardWeight: input.netWeight,
        balanceWeight: input.netWeight,
        inwardQty: input.quantity ?? 0,
        balanceQty: input.quantity ?? 0,
        source: "Vendor",
        destination: input.storageLocation,
        reference: input.batchNumber,
        remarks: "Inventory lot created",
        userId: input.userId
      }
    });
    return item;
  });
}

export async function issueMaterial(input: {
  companyId: string;
  inventoryItemId: string;
  jobCardId?: string;
  issueWeight: number;
  destination: string;
  userId?: string;
  adminOverride?: boolean;
}) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.inventoryItem.findUniqueOrThrow({ where: { id: input.inventoryItemId } });
    if (!canIssueStock(Number(item.netWeight), input.issueWeight, input.adminOverride)) {
      throw new Error("Negative stock is not allowed without admin override.");
    }
    const nextWeight = Number(item.netWeight) - input.issueWeight;
    const updated = await tx.inventoryItem.update({
      where: { id: item.id },
      data: { netWeight: nextWeight, fineEquivalent: fineMetalEquivalent(nextWeight, Number(item.purityKarat ?? 0), Number(item.customPurityPct ?? 0)), status: "ISSUED" }
    });
    if (input.jobCardId) {
      await tx.materialIssue.create({ data: { jobCardId: input.jobCardId, materialType: item.materialType, weight: input.issueWeight, remarks: input.destination } });
      await tx.jobCard.update({ where: { id: input.jobCardId }, data: { materialIssued: { increment: input.issueWeight }, status: "MATERIAL_ISSUED" } });
    }
    await tx.inventoryLedger.create({
      data: {
        companyId: input.companyId,
        inventoryItemId: item.id,
        movementType: input.jobCardId ? "ISSUE_TO_KARIGAR" : "ISSUE_TO_PRODUCTION",
        outwardWeight: input.issueWeight,
        balanceWeight: nextWeight,
        source: item.storageLocation,
        destination: input.destination,
        reference: input.jobCardId,
        remarks: "Material issued",
        userId: input.userId
      }
    });
    return updated;
  });
}

export async function recordMaterialReturn(input: {
  companyId: string;
  inventoryItemId: string;
  jobCardId: string;
  returnedWeight: number;
  expectedWeight: number;
  actualReturnWeight: number;
  scrapWeight?: number;
  lossWeight?: number;
  userId?: string;
}) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.inventoryItem.findUniqueOrThrow({ where: { id: input.inventoryItemId } });
    const nextWeight = Number(item.netWeight) + input.returnedWeight;
    const waste = wastage(input.expectedWeight, input.actualReturnWeight, input.scrapWeight ?? 0);
    await tx.materialReturn.create({
      data: {
        jobCardId: input.jobCardId,
        materialType: item.materialType,
        returnedWeight: input.returnedWeight,
        scrapWeight: input.scrapWeight ?? 0,
        wastageWeight: waste,
        remarks: `Loss: ${input.lossWeight ?? 0}g`
      }
    });
    await tx.inventoryItem.update({
      where: { id: item.id },
      data: { netWeight: nextWeight, fineEquivalent: fineMetalEquivalent(nextWeight, Number(item.purityKarat ?? 0), Number(item.customPurityPct ?? 0)), status: "AVAILABLE" }
    });
    await tx.jobCard.update({
      where: { id: input.jobCardId },
      data: { actualReturnWeight: input.actualReturnWeight, wastage: waste, loss: input.lossWeight ?? 0, status: "PARTIALLY_RETURNED" }
    });
    await tx.inventoryLedger.create({
      data: {
        companyId: input.companyId,
        inventoryItemId: item.id,
        movementType: "RETURN_FROM_KARIGAR",
        inwardWeight: input.returnedWeight,
        balanceWeight: nextWeight,
        source: "Karigar",
        destination: item.storageLocation,
        reference: input.jobCardId,
        remarks: `Scrap ${input.scrapWeight ?? 0}g, wastage ${waste}g`,
        userId: input.userId
      }
    });
  });
}
