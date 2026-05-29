import type { InventoryItem, JobCard, LedgerEntry, ProductDesign, RoleSlug } from "@/lib/types";

export const company = {
  id: "aurum",
  name: "AurumFlow Imitation Jewellery",
  legalName: "AurumFlow Fashion Jewellery Pvt Ltd",
  gstNumber: "27AAICA1234F1Z9",
  plan: "Inventory Focus",
  status: "Active"
};

export const users = [
  { name: "SaaS Admin", email: "super@jewelsuite.test", role: "Super Admin", slug: "super-admin" },
  { name: "Meera Shah", email: "owner@aurum.test", role: "Company Admin", slug: "company-admin" },
  { name: "Ravi Menon", email: "inventory@aurum.test", role: "Inventory Manager", slug: "inventory-manager" },
  { name: "Dev Kapadia", email: "accounts@aurum.test", role: "Billing / Accounts Manager", slug: "billing-manager" }
] as const;

export const inventory: InventoryItem[] = [
  item("i-brass", "Brass Sheet 0.8mm", "Brass", 0, 0, 0, 420, "kg", 185, "Raw Material Rack", "Metal Hub", "BRS-2406"),
  item("i-copper", "Copper Wire Roll", "Copper", 0, 0, 0, 120, "kg", 720, "Raw Material Rack", "Copperline", "COP-2406"),
  item("i-alloy", "Casting Alloy Granules", "Alloy", 0, 0, 0, 260, "kg", 310, "Casting Store", "Alloy Mart", "ALY-2406"),
  item("i-cz", "CZ Round 2mm", "CZ", 0, 0, 0, 8400, "pcs", 1.8, "Stone Bins", "Surat Imitation Stones", "CZ2-2406"),
  item("i-kundan", "Kundan Polki Assorted", "Kundan", 0, 0, 0, 2300, "pcs", 6.5, "Stone Bins", "Jaipur Kundan Co.", "KDN-2406"),
  item("i-pearl", "Hanging Pearl 4mm", "Pearl", 0, 0, 0, 620, "pcs", 3.2, "Component Bins", "Pearl Craft", "PRL4-2406"),
  item("i-hooks", "Earring Hooks", "Hook", 0, 0, 0, 230, "pairs", 4, "Findings Shelf", "Findings World", "HOK-2406"),
  item("i-chain", "Adjustable Chain 18 inch", "Chain", 0, 0, 0, 96, "pcs", 18, "Chain Shelf", "Chain House", "CH18-2406")
];

function item(id: string, itemName: string, materialType: InventoryItem["materialType"], grossWeight: number, netWeight: number, fineEquivalent: number, quantity: number, unit: string, purchaseRate: number, storageLocation: string, vendor: string, batchNumber: string): InventoryItem {
  return {
    id,
    itemName,
    materialType,
    grossWeight,
    netWeight,
    fineEquivalent,
    quantity,
    unit,
    vendor,
    batchNumber,
    purchaseDate: "2026-06-01",
    purchaseRate,
    currentValue: Math.round(quantity * purchaseRate),
    storageLocation,
    status: quantity < 300 ? "Low Stock" : "Available"
  };
}

export const ledger: LedgerEntry[] = [
  { id: "l1", date: "2026-06-01", item: "CZ Round 2mm", movementType: "Purchase", inwardWeight: 0, outwardWeight: 0, balanceWeight: 0, inwardQty: 8400, balanceQty: 8400, source: "Surat Imitation Stones", destination: "Stone Bins", user: "Ravi Menon", reference: "PUR-CZ2", remarks: "Opening component stock" },
  { id: "l2", date: "2026-06-03", item: "Earring Hooks", movementType: "Assembly Issue", inwardWeight: 0, outwardWeight: 0, balanceWeight: 0, outwardQty: 270, balanceQty: 230, source: "Findings Shelf", destination: "Assembly", user: "Ravi Menon", reference: "KIT-ER104", remarks: "Issued for CZ earrings" },
  { id: "l3", date: "2026-06-04", item: "Oval Halo CZ Earrings", movementType: "Finished Goods Entry", inwardWeight: 0, outwardWeight: 0, balanceWeight: 0, inwardQty: 84, balanceQty: 84, source: "Assembly", destination: "Finished Stock", user: "Ravi Menon", reference: "FG-ER104", remarks: "Rose gold variant added" },
  { id: "l4", date: "2026-06-06", item: "Pearl Bangle", movementType: "Return From Client", inwardWeight: 0, outwardWeight: 0, balanceWeight: 0, inwardQty: 3, balanceQty: 10, source: "Maya Fashion", destination: "QC Hold", user: "Dev Kapadia", reference: "RET-2406-002", remarks: "Returned stock under inspection" }
];

export const designs: ProductDesign[] = [
  { id: "d1", designName: "Oval Halo CZ Earrings", sku: "ER-CZ104-BRS-RG-CZ-STD", category: "Earrings", metalType: "Brass", expectedMetalWeight: 0, expectedStoneWeight: 0, expectedWastage: 0, labourProcess: "Assembly, plating, QC", makingChargeType: "Per pair", bom: ["Brass base pair", "CZ 2mm x 28", "Earring hooks x 1 pair", "Rose gold plating"], estimatedCost: 165, sellingSuggestion: 399, active: true },
  { id: "d2", designName: "Kundan Choker Set", sku: "NK-KD221-ALY-ANT-KD-ADJ16", category: "Necklace Set", metalType: "Alloy", expectedMetalWeight: 0, expectedStoneWeight: 0, expectedWastage: 0, labourProcess: "Assembly, antique finish, QC", makingChargeType: "Per set", bom: ["Alloy base", "Kundan stones", "Adjustable chain", "Lobster clasp"], estimatedCost: 520, sellingSuggestion: 1299, active: true },
  { id: "d3", designName: "Pearl Bangle", sku: "BG-PL088-COP-MG-PRL-26", category: "Bangle", metalType: "Copper", expectedMetalWeight: 0, expectedStoneWeight: 0, expectedWastage: 0, labourProcess: "Assembly, matte plating, pearl setting", makingChargeType: "Per piece", bom: ["Copper bangle base", "Pearls 4mm x 16", "Matte gold plating"], estimatedCost: 210, sellingSuggestion: 599, active: true }
];

export const orders = [
  { id: "o1", customer: "Zaveri Retail LLP", orderNumber: "ORD-2406-001", orderDate: "2026-06-01", deliveryDate: "2026-06-12", design: "Oval Halo CZ Earrings", quantity: 120, metalType: "Brass", purityKarat: 0, advanceReceived: 10000, status: "Packed" },
  { id: "o2", customer: "Maya Fashion", orderNumber: "ORD-2406-002", orderDate: "2026-06-03", deliveryDate: "2026-06-18", design: "Kundan Choker Set", quantity: 35, metalType: "Alloy", purityKarat: 0, advanceReceived: 15000, status: "Billing Pending" }
];

export const jobCards: JobCard[] = [];

export const finishedGoods = [
  { sku: "ER-CZ104-BRS-RG-CZ-STD", design: "Oval Halo CZ Earrings", order: "ORD-2406-001", metalType: "Brass", karat: 0, grossWeight: 0, netWeight: 0, stoneWeight: 0, cost: 165, selling: 399, huid: "", location: "Finished Stock", status: "Available" },
  { sku: "NK-KD221-ALY-ANT-KD-ADJ16", design: "Kundan Choker Set", order: "ORD-2406-002", metalType: "Alloy", karat: 0, grossWeight: 0, netWeight: 0, stoneWeight: 0, cost: 520, selling: 1299, huid: "", location: "Finished Stock", status: "Reserved" }
];

export const customers = [
  { name: "Zaveri Retail LLP", gst: "27AAAFZ4567M1Z4", phone: "+91 98765 11001", credit: 1200000, orders: 12 },
  { name: "Maya Fashion", gst: "27MAYA4567M1Z8", phone: "+91 98765 11002", credit: 600000, orders: 8 }
];

export const vendors = [
  { name: "Surat Imitation Stones", type: "Stone Supplier", gst: "24SURAT9876L1Z7", material: "CZ, AD stones", outstanding: 42000 },
  { name: "Jaipur Kundan Co.", type: "Kundan Supplier", gst: "08KUNDAN9876L1Z4", material: "Kundan, polki stones", outstanding: 28000 },
  { name: "Findings World", type: "Findings Supplier", gst: "27FIND1234F1Z2", material: "Hooks, clasps, jump rings", outstanding: 12000 }
];

export const alerts = [
  { title: "Earring hooks below reorder point", message: "Only 230 pairs available against reorder point of 500.", severity: "Critical" },
  { title: "Pearl bangle dead stock", message: "Matte gold 2.6 bangle variant has not moved in 82 days.", severity: "Warning" },
  { title: "Returned stock pending QC", message: "RET-2406-002 is waiting for inspection before adding back to inventory.", severity: "Info" }
];

export const plans = [
  { name: "Inventory Focus", price: 14999, maxUsers: 20, features: ["SKU variants", "BOM", "Returns", "Insights"] }
];

export const rolePermissions: Record<RoleSlug, string[]> = {
  "super-admin": ["companies", "users", "billing", "inventory"],
  "company-admin": ["dashboard", "inventory", "sku", "bom", "returns", "insights", "billing", "users"],
  "inventory-manager": ["dashboard", "inventory", "sku", "bom", "returns", "insights"],
  "billing-manager": ["dashboard", "billing", "returns", "reports"]
};
