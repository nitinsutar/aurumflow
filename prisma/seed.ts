import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = ["dashboard", "sku-variants", "inventory", "components-bom", "returns", "ledger", "insights", "users", "billing", "saas"];
const roleDefs = [
  { name: "Super Admin", slug: "super-admin", keys: ["saas", "users"] },
  { name: "Company Admin", slug: "company-admin", keys: permissions.filter((key) => key !== "saas") },
  { name: "Inventory Manager", slug: "inventory-manager", keys: ["dashboard", "sku-variants", "inventory", "components-bom", "returns", "ledger", "insights"] },
  { name: "Billing / Accounts Manager", slug: "billing-manager", keys: ["dashboard", "returns", "ledger", "billing"] }
];

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

  const plan = await prisma.subscriptionPlan.create({
    data: {
      name: "Inventory Focus",
      price: 12999,
      maxUsers: 12,
      features: ["Attribute SKU generator", "Variant image mapping", "Component inventory", "BOM and bundles", "Returns", "Dead stock alerts", "Velocity reports"]
    }
  });

  const company = await prisma.company.create({
    data: {
      name: "AurumFlow Imitation Jewellery",
      legalName: "AurumFlow Fashion Jewellery Pvt Ltd",
      gstNumber: "27AAICA2026F1Z9",
      phone: "+91 98765 11000",
      email: "ops@aurum.test",
      address: "Andheri East, Mumbai",
      planId: plan.id
    }
  });
  await prisma.company.createMany({ data: [{ name: "Mira Fashion Ornaments", status: "ACTIVE", planId: plan.id }, { name: "KundanKart Wholesale", status: "SUSPENDED", planId: plan.id }] });

  await prisma.permission.createMany({ data: permissions.map((key) => ({ key, label: titleize(key) })) });
  const allPermissions = await prisma.permission.findMany();
  const roles = new Map<string, string>();
  for (const roleDef of roleDefs) {
    const role = await prisma.role.create({
      data: {
        companyId: roleDef.slug === "super-admin" ? null : company.id,
        name: roleDef.name,
        slug: roleDef.slug,
        permissions: { connect: allPermissions.filter((permission) => roleDef.keys.includes(permission.key)).map((permission) => ({ id: permission.id })) }
      }
    });
    roles.set(roleDef.slug, role.id);
  }

  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.createMany({
    data: [
      { roleId: roles.get("super-admin"), name: "SaaS Admin", email: "super@jewelsuite.test", passwordHash, isSuperAdmin: true },
      { companyId: company.id, roleId: roles.get("company-admin"), name: "Meera Shah", email: "owner@aurum.test", passwordHash },
      { companyId: company.id, roleId: roles.get("inventory-manager"), name: "Ravi Menon", email: "inventory@aurum.test", passwordHash },
      { companyId: company.id, roleId: roles.get("billing-manager"), name: "Dev Kapadia", email: "accounts@aurum.test", passwordHash }
    ]
  });

  const [warehouse, finishing, dispatch] = await Promise.all([
    prisma.location.create({ data: { companyId: company.id, name: "Main Warehouse", type: "Raw material and components" } }),
    prisma.location.create({ data: { companyId: company.id, name: "Finishing Room", type: "Assembly and plating" } }),
    prisma.location.create({ data: { companyId: company.id, name: "Dispatch Rack", type: "Finished goods" } })
  ]);

  await prisma.material.createMany({
    data: [
      { companyId: company.id, name: "Brass Base Sheet", type: "BRASS", unit: "kg", reorderLevel: 12 },
      { companyId: company.id, name: "Copper Wire", type: "COPPER", unit: "kg", reorderLevel: 8 },
      { companyId: company.id, name: "Silver Plated Alloy Chain", type: "ALLOY", unit: "m", reorderLevel: 150 },
      { companyId: company.id, name: "CZ White Stones", type: "CZ", unit: "pcs", reorderLevel: 2500 },
      { companyId: company.id, name: "Kundan Polki Stones", type: "KUNDAN", unit: "pcs", reorderLevel: 800 },
      { companyId: company.id, name: "Pearl Drops", type: "PEARL", unit: "pcs", reorderLevel: 1000 },
      { companyId: company.id, name: "Earring Hooks", type: "HOOK", unit: "pcs", reorderLevel: 3000 }
    ]
  });

  const [metalVendor, stoneVendor, findingVendor] = await Promise.all([
    prisma.vendor.create({ data: { companyId: company.id, vendorName: "Raj Alloy Supply", vendorType: "METAL_SUPPLIER", materialSupplied: "Brass, copper, alloy" } }),
    prisma.vendor.create({ data: { companyId: company.id, vendorName: "Jaipur CZ & Kundan", vendorType: "STONE_SUPPLIER", materialSupplied: "CZ, AD, Kundan stones" } }),
    prisma.vendor.create({ data: { companyId: company.id, vendorName: "Mumbai Findings Mart", vendorType: "PACKAGING_SUPPLIER", materialSupplied: "Hooks, clasps, jump rings, chains" } })
  ]);

  const items = await Promise.all([
    inventoryItem(company.id, warehouse.id, metalVendor.id, "Brass stamping sheet", "BRASS", 42, 0, "kg", 510, "BR-BASE-2605"),
    inventoryItem(company.id, warehouse.id, metalVendor.id, "Copper wire coil", "COPPER", 18, 0, "kg", 720, "CU-WIRE-2605"),
    inventoryItem(company.id, warehouse.id, metalVendor.id, "Alloy chain roll", "ALLOY", 0, 640, "m", 38, "AL-CHAIN-2605"),
    inventoryItem(company.id, warehouse.id, stoneVendor.id, "White CZ 2mm lot", "CZ", 0, 9800, "pcs", 1.45, "CZ-WH-2MM"),
    inventoryItem(company.id, warehouse.id, stoneVendor.id, "Kundan oval stones", "KUNDAN", 0, 2250, "pcs", 4.8, "KUN-OV-2605"),
    inventoryItem(company.id, warehouse.id, findingVendor.id, "Pearl hanging drops", "PEARL", 0, 4200, "pcs", 2.2, "PRL-DRP-2605"),
    inventoryItem(company.id, warehouse.id, findingVendor.id, "Earring hooks", "HOOK", 0, 15000, "pcs", 0.35, "HOOK-GD-2605"),
    inventoryItem(company.id, warehouse.id, findingVendor.id, "Lobster clasps", "CLASP", 0, 5600, "pcs", 1.1, "CLASP-2605"),
    inventoryItem(company.id, warehouse.id, findingVendor.id, "Gift box packaging", "PACKAGING", 0, 1800, "pcs", 14, "BOX-PREM-2605")
  ]);

  await Promise.all([
    design(company.id, "CZ Halo Stud Earrings", "AF-EAR-CZ-HG-001", "Earrings", "BRASS", 0.018, "High-gold plating, CZ setting, hook assembly", 82, 189),
    design(company.id, "Rose Gold Pearl Bracelet", "AF-BRC-PRL-RG-014", "Bracelet", "COPPER", 0.024, "Rose gold plating, pearl hangings", 96, 249),
    design(company.id, "Antique Kundan Choker", "AF-NEC-KUN-ANT-022", "Necklace", "ALLOY", 0.075, "Antique finish, Kundan setting, chain clasp", 310, 799),
    design(company.id, "Matte Gold Bangle 2.6", "AF-BAN-MG-26-031", "Bangle", "BRASS", 0.042, "Matte gold plating, size-specific polishing", 145, 349),
    design(company.id, "Silver Finish AD Pendant", "AF-PEN-AD-SV-006", "Pendant", "ALLOY", 0.016, "Silver plating, AD stone setting", 74, 179)
  ]);

  for (const item of items) {
    await prisma.inventoryLedger.create({ data: { companyId: company.id, inventoryItemId: item.id, movementType: "PURCHASE", inwardWeight: item.netWeight, inwardQty: item.quantity, balanceWeight: item.netWeight, balanceQty: item.quantity, source: "Vendor", destination: item.storageLocation, reference: item.batchNumber, remarks: "Opening imitation jewellery stock" } });
    await prisma.barcode.create({ data: { code: `BAR-${item.batchNumber}`, labelType: "RAW_LOT", inventoryItemId: item.id, rfidPlaceholder: "Future RFID tag" } });
  }

  await Promise.all([
    finishedGood(company.id, dispatch.id, "AF-EAR-CZ-HG-001-RG", "BRASS", 0.018, 120, 189, "AVAILABLE"),
    finishedGood(company.id, dispatch.id, "AF-NEC-KUN-ANT-022-STD", "ALLOY", 0.075, 360, 799, "RESERVED"),
    finishedGood(company.id, dispatch.id, "AF-BAN-MG-26-031-2.6", "BRASS", 0.042, 158, 349, "AVAILABLE")
  ]);

  await prisma.alert.createMany({ data: [{ companyId: company.id, title: "Low hook stock", message: "Earring hooks are close to reorder level for next week's assembly.", severity: "WARNING" }, { companyId: company.id, title: "Dead stock warning", message: "Silver finish AD pendants have not moved in 75 days.", severity: "WARNING" }, { companyId: company.id, title: "Fast mover", message: "Rose gold pearl bracelets are selling 2.4x faster than last month.", severity: "INFO" }, { companyId: company.id, title: "Return received", message: "Retailer return can be inspected and added back to sellable stock.", severity: "INFO" }] });
  await prisma.reportSavedView.createMany({ data: ["Variant stock", "Component reorder", "Dead stock", "Velocity by category"].map((name) => ({ companyId: company.id, name, reportKey: name.toLowerCase().replaceAll(" ", "_"), filters: { month: "2026-05" } })) });
  await prisma.activityLog.create({ data: { companyId: company.id, action: "Seeded imitation jewellery inventory tenant", entity: "Company", entityId: company.id, metadata: { users: 4, inventoryLots: items.length, roles: roleDefs.map((role) => role.slug) } } });
}

async function inventoryItem(companyId: string, locationId: string, vendorId: string, itemName: string, materialType: any, netWeight: number, quantity: number, unit: string, purchaseRate: number, batchNumber: string) {
  return prisma.inventoryItem.create({ data: { companyId, locationId, vendorId, itemName, materialType, grossWeight: netWeight, netWeight, fineEquivalent: 0, quantity, unit, batchNumber, purchaseDate: new Date("2026-05-20"), purchaseRate, currentValue: (quantity || netWeight) * purchaseRate, storageLocation: locationId } });
}

async function design(companyId: string, designName: string, sku: string, category: string, metalType: any, expectedMetalWeight: number, labourProcess: string, estimatedCost: number, sellingSuggestion: number) {
  return prisma.productDesign.create({ data: { companyId, designName, sku, category, metalType, expectedMetalWeight, expectedStoneWeight: 0, expectedWastage: 2, labourProcess, makingChargeType: "Per piece", estimatedCost, sellingSuggestion, bom: { create: [{ material: `${titleize(metalType.toLowerCase())} base`, quantity: expectedMetalWeight, unit: "kg" }, { material: "Variant-specific stones/findings", quantity: 1, unit: "set" }] } } });
}

async function finishedGood(companyId: string, locationId: string, sku: string, metalType: any, netWeight: number, totalCost: number, sellingPrice: number, status: any) {
  const item = await prisma.finishedGood.create({ data: { companyId, locationId, sku, metalType, grossWeight: netWeight, netWeight, stoneWeight: 0, makingCost: totalCost * 0.22, stoneCost: totalCost * 0.31, metalCost: totalCost * 0.47, totalCost, sellingPrice, huid: "", certification: "Imitation jewellery quality check", status } });
  await prisma.barcode.create({ data: { code: `BAR-${sku}`, labelType: "FINISHED_GOOD", finishedGoodId: item.id, rfidPlaceholder: "Future RFID tag" } });
  return item;
}

function titleize(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
