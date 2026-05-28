import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.reportSavedView.deleteMany();
  await prisma.barcode.deleteMany();
  await prisma.finishedGood.deleteMany();
  await prisma.materialReturn.deleteMany();
  await prisma.materialIssue.deleteMany();
  await prisma.jobCard.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.inventoryLedger.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.bOM.deleteMany();
  await prisma.productDesign.deleteMany();
  await prisma.metalRate.deleteMany();
  await prisma.material.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.company.deleteMany();
  await prisma.subscriptionPlan.deleteMany();

  const plan = await prisma.subscriptionPlan.create({ data: { name: "Enterprise Foundry", price: 49999, maxUsers: 100, features: ["Multi-location", "Advanced audit", "AI assistant"] } });
  const company = await prisma.company.create({ data: { name: "AurumWorks Jewellery Manufacturing", legalName: "AurumWorks Manufacturing Pvt Ltd", gstNumber: "27AAICA1234F1Z9", phone: "+91 98765 11000", email: "ops@aurum.test", address: "Zaveri Bazaar, Mumbai", planId: plan.id } });

  const permissionKeys = ["dashboard", "inventory", "ledger", "rates", "production", "job-cards", "orders", "finished-goods", "pricing", "reports", "settings", "audit", "saas"];
  await prisma.permission.createMany({ data: permissionKeys.map((key) => ({ key, label: key.replace(/-/g, " ") })) });
  const permissions = await prisma.permission.findMany();

  const roleDefs = [
    ["Company Owner/Admin", "owner"], ["Inventory Manager", "inventory"], ["Production Manager", "production"], ["Karigar/Worker", "karigar"],
    ["Sales/Order Manager", "sales"], ["Accountant", "accountant"], ["Auditor/Read-only User", "auditor"], ["Super Admin", "super-admin"]
  ] as const;
  const roles = new Map<string, string>();
  for (const [name, slug] of roleDefs) {
    const role = await prisma.role.create({ data: { companyId: slug === "super-admin" ? null : company.id, name, slug, permissions: { connect: permissions.map((permission) => ({ id: permission.id })) } } });
    roles.set(slug, role.id);
  }

  const passwordHash = await bcrypt.hash("password123", 10);
  const demoUsers = [
    ["Meera Shah", "owner@aurum.test", "owner"], ["Ravi Menon", "inventory@aurum.test", "inventory"], ["Anika Rao", "production@aurum.test", "production"],
    ["Iqbal Ansari", "karigar1@aurum.test", "karigar"], ["Ketan Solanki", "karigar2@aurum.test", "karigar"], ["Prem Das", "karigar3@aurum.test", "karigar"],
    ["Nisha Parekh", "sales@aurum.test", "sales"], ["Dev Kapadia", "accountant@aurum.test", "accountant"], ["Sonal Jain", "auditor@aurum.test", "auditor"]
  ] as const;
  for (const [name, email, slug] of demoUsers) await prisma.user.create({ data: { companyId: company.id, roleId: roles.get(slug), name, email, passwordHash } });
  await prisma.user.create({ data: { roleId: roles.get("super-admin"), name: "SaaS Admin", email: "super@jewelsuite.test", passwordHash, isSuperAdmin: true } });

  const vault = await prisma.location.create({ data: { companyId: company.id, name: "Vault A", type: "Metal Vault" } });
  const dispatch = await prisma.location.create({ data: { companyId: company.id, name: "Dispatch", type: "Finished Goods" } });
  const vendor = await prisma.vendor.create({ data: { companyId: company.id, vendorName: "Veda Metals", vendorType: "METAL_SUPPLIER", gstNumber: "27VEDAM1234F1Z8", materialSupplied: "Gold bullion" } });

  const gold22 = await prisma.inventoryItem.create({ data: { companyId: company.id, locationId: vault.id, vendorId: vendor.id, itemName: "916 Gold Bar", materialType: "GOLD", purityKarat: 22, grossWeight: 920.7, netWeight: 920.7, fineEquivalent: 843.975, batchNumber: "AU22-2405", purchaseRate: 5960, currentValue: 5487372, storageLocation: "Vault A" } });
  await prisma.inventoryLedger.create({ data: { companyId: company.id, inventoryItemId: gold22.id, movementType: "PURCHASE", inwardWeight: 920.7, balanceWeight: 920.7, source: "Veda Metals", destination: "Vault A", reference: "PUR-1001", remarks: "Opening seed stock" } });

  const design = await prisma.productDesign.create({ data: { companyId: company.id, designName: "Temple Lakshmi Necklace", sku: "DSN-NCK-001", category: "Necklace", metalType: "GOLD", expectedMetalWeight: 86, expectedStoneWeight: 4.2, expectedWastage: 3.5, labourProcess: "CAD, casting, stone setting, polish", makingChargeType: "Per gram", estimatedCost: 684000, sellingSuggestion: 812000, bom: { create: [{ material: "22K gold", quantity: 86, unit: "g" }, { material: "Ruby", quantity: 4.2, unit: "ct" }] } } });
  const customer = await prisma.customer.create({ data: { companyId: company.id, customerName: "Zaveri Retail LLP", businessName: "Zaveri Retail LLP", gstNumber: "27AAAFZ4567M1Z4", phone: "+91 98765 11001", creditLimit: 1200000 } });
  const order = await prisma.order.create({ data: { companyId: company.id, customerId: customer.id, designId: design.id, orderNumber: "ORD-2405-001", orderDate: new Date("2026-05-06"), deliveryDate: new Date("2026-05-30"), quantity: 2, metalType: "GOLD", purityKarat: 22, advanceReceived: 250000, status: "IN_PRODUCTION" } });
  const karigar = await prisma.user.findFirstOrThrow({ where: { email: "karigar1@aurum.test" } });
  const job = await prisma.jobCard.create({ data: { companyId: company.id, orderId: order.id, designId: design.id, assignedKarigarId: karigar.id, jobCardNumber: "JC-2405-001", stage: "CASTING", materialIssued: 82.5, issueDate: new Date("2026-05-12"), expectedReturn: new Date("2026-05-25"), expectedWeight: 80, actualReturnWeight: 76.9, wastage: 3.1, labourCharges: 4500, status: "IN_PROGRESS" } });
  await prisma.finishedGood.create({ data: { companyId: company.id, designId: design.id, orderId: order.id, locationId: dispatch.id, sku: "FG-NCK-001-A", metalType: "GOLD", purityKarat: 22, grossWeight: 88.4, netWeight: 84.2, stoneWeight: 4.2, totalCost: 706500, sellingPrice: 824000, huid: "HUID-AU-88541", certification: "BIS placeholder", status: "UNDER_QC" } });
  await prisma.barcode.create({ data: { code: "BAR-JC-00001", labelType: "JOB_CARD", jobCardId: job.id, rfidPlaceholder: "Future RFID tag" } });
  await prisma.alert.create({ data: { companyId: company.id, title: "Job card delayed", message: "JC-2405-001 has crossed expected return date.", severity: "CRITICAL" } });
  await prisma.activityLog.create({ data: { companyId: company.id, action: "Seeded demo tenant", entity: "Company", entityId: company.id, metadata: { users: demoUsers.length } } });
}

main().then(async () => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
