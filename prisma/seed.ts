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

  const plan = await prisma.subscriptionPlan.create({ data: { name: "Inventory Focus", price: 14999, maxUsers: 20, features: ["SKU variants", "BOM", "Returns", "Insights"] } });
  const company = await prisma.company.create({ data: { name: "AurumWorks Fashion Jewellery", legalName: "AurumWorks Manufacturing Pvt Ltd", gstNumber: "27AAICA1234F1Z9", phone: "+91 98765 11000", email: "ops@aurum.test", address: "Mumbai", planId: plan.id } });

  const permissionKeys = ["dashboard", "inventory", "ledger", "rates", "production", "job-cards", "orders", "finished-goods", "pricing", "reports", "settings", "audit", "saas"];
  await prisma.permission.createMany({ data: permissionKeys.map((key) => ({ key, label: key.replace(/-/g, " ") })) });
  const permissions = await prisma.permission.findMany();
  const roleDefs: Array<[string, string, string[]]> = [["Company Owner/Admin", "owner", permissionKeys.filter((key) => key !== "saas")], ["Inventory Manager", "inventory", ["dashboard", "inventory", "ledger", "rates", "reports"]], ["Production Manager", "production", ["dashboard", "production", "job-cards", "orders", "reports"]], ["Karigar/Worker", "karigar", ["job-cards"]], ["Sales/Order Manager", "sales", ["orders", "finished-goods", "pricing"]], ["Accountant", "accountant", ["ledger", "pricing", "reports", "audit"]], ["Auditor/Read-only User", "auditor", ["dashboard", "reports", "audit"]], ["Super Admin", "super-admin", ["saas"]]];
  const roles = new Map<string, string>();
  for (const [name, slug, keys] of roleDefs) {
    const role = await prisma.role.create({ data: { companyId: slug === "super-admin" ? null : company.id, name, slug, permissions: { connect: permissions.filter((permission) => keys.includes(permission.key)).map((permission) => ({ id: permission.id })) } } });
    roles.set(slug, role.id);
  }

  const passwordHash = await bcrypt.hash("password123", 10);
  for (const [name, email, slug] of [["Meera Shah", "owner@aurum.test", "owner"], ["Ravi Menon", "inventory@aurum.test", "inventory"], ["Anika Rao", "production@aurum.test", "production"], ["Iqbal Ansari", "karigar1@aurum.test", "karigar"], ["Nisha Parekh", "sales@aurum.test", "sales"], ["Dev Kapadia", "accountant@aurum.test", "accountant"], ["Sonal Jain", "auditor@aurum.test", "auditor"]] as const) {
    await prisma.user.create({ data: { companyId: company.id, roleId: roles.get(slug), name, email, passwordHash } });
  }
  await prisma.user.create({ data: { roleId: roles.get("super-admin"), name: "SaaS Admin", email: "super@jewelsuite.test", passwordHash, isSuperAdmin: true } });

  const location = await prisma.location.create({ data: { companyId: company.id, name: "Main Warehouse", type: "Inventory" } });
  const vendor = await prisma.vendor.create({ data: { companyId: company.id, vendorName: "AurumFlow Studio", vendorType: "JOB_WORKER", materialSupplied: "Fashion jewellery" } });
  const item = await prisma.inventoryItem.create({ data: { companyId: company.id, locationId: location.id, vendorId: vendor.id, itemName: "Oval Halo CZ Earrings - Rose Gold", materialType: "ACCESSORY", grossWeight: 0, netWeight: 0, fineEquivalent: 0, quantity: 84, unit: "pcs", batchNumber: "ER-CZ104-RG", purchaseRate: 220, currentValue: 18480, storageLocation: "Main Warehouse" } });
  await prisma.inventoryLedger.create({ data: { companyId: company.id, inventoryItemId: item.id, movementType: "PURCHASE", inwardQty: 84, balanceQty: 84, source: "Opening", destination: "Main Warehouse", reference: "ER-CZ104-RG", remarks: "Opening fashion jewellery stock" } });
  await prisma.alert.create({ data: { companyId: company.id, title: "Component reorder", message: "Earring hooks are below reorder point.", severity: "WARNING" } });
  await prisma.activityLog.create({ data: { companyId: company.id, action: "Seeded inventory-focused tenant", entity: "Company", entityId: company.id } });
}

main().then(async () => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
