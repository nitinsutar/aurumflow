import { fineMetalEquivalent } from "@/lib/calculations";
import type { InventoryItem, JobCard, LedgerEntry, Order, ProductDesign, RoleSlug } from "@/lib/types";

export const company = { id: "aurum", name: "AurumWorks Jewellery Manufacturing", legalName: "AurumWorks Manufacturing Pvt Ltd", gstNumber: "27AAICA1234F1Z9", plan: "Enterprise Foundry", status: "Active" };

export const users = [
  { name: "Meera Shah", email: "owner@aurum.test", role: "Company Owner/Admin", slug: "owner" },
  { name: "Ravi Menon", email: "inventory@aurum.test", role: "Inventory Manager", slug: "inventory" },
  { name: "Anika Rao", email: "production@aurum.test", role: "Production Manager", slug: "production" },
  { name: "Iqbal Ansari", email: "karigar1@aurum.test", role: "Karigar/Worker", slug: "karigar" },
  { name: "Ketan Solanki", email: "karigar2@aurum.test", role: "Karigar/Worker", slug: "karigar" },
  { name: "Prem Das", email: "karigar3@aurum.test", role: "Karigar/Worker", slug: "karigar" },
  { name: "Nisha Parekh", email: "sales@aurum.test", role: "Sales/Order Manager", slug: "sales" },
  { name: "Dev Kapadia", email: "accountant@aurum.test", role: "Accountant", slug: "accountant" },
  { name: "Sonal Jain", email: "auditor@aurum.test", role: "Auditor/Read-only User", slug: "auditor" },
  { name: "SaaS Admin", email: "super@jewelsuite.test", role: "Super Admin", slug: "super-admin" }
] as const;

export const inventory: InventoryItem[] = [
  metal("i-24k", "999 Gold Grain", "24K", 24, 580.42, 580.42, 6420, "Vault A", "Veda Metals", "AU24-2405"),
  metal("i-22k", "916 Gold Bar", "22K", 22, 920.7, 920.7, 5960, "Vault A", "Veda Metals", "AU22-2405"),
  metal("i-18k", "750 Gold Alloy", "18K", 18, 410.25, 410.25, 4880, "Casting Room", "Orbit Bullion", "AU18-2405"),
  { id: "i-silver", itemName: "Fine Silver Sheet", materialType: "Silver", grossWeight: 5200, netWeight: 5200, fineEquivalent: 5200, quantity: 0, unit: "g", vendor: "Silverline", batchNumber: "AG-042", purchaseDate: "2026-05-04", purchaseRate: 86, currentValue: 447200, storageLocation: "Vault B", status: "Available" },
  { id: "i-diamond", itemName: "VS Diamond Lot", materialType: "Diamond", grossWeight: 38, netWeight: 38, fineEquivalent: 38, quantity: 320, unit: "ct", vendor: "Surat Gems", batchNumber: "DIA-VS-18", purchaseDate: "2026-05-09", purchaseRate: 82000, currentValue: 3116000, storageLocation: "Gem Safe", status: "Available" },
  { id: "i-ruby", itemName: "Ruby Calibrated Stones", materialType: "Gemstone", grossWeight: 55, netWeight: 55, fineEquivalent: 55, quantity: 170, unit: "ct", vendor: "Jaipur Color", batchNumber: "RBY-22", purchaseDate: "2026-05-10", purchaseRate: 11000, currentValue: 605000, storageLocation: "Gem Safe", status: "Reserved" }
];

function metal(id: string, itemName: string, label: string, karat: number, grossWeight: number, netWeight: number, purchaseRate: number, storageLocation: string, vendor: string, batchNumber: string): InventoryItem {
  return { id, itemName, materialType: "Gold", purityKarat: karat, grossWeight, netWeight, fineEquivalent: fineMetalEquivalent(netWeight, karat), quantity: 0, unit: "g", vendor, batchNumber, purchaseDate: "2026-05-02", purchaseRate, currentValue: Math.round(netWeight * purchaseRate), storageLocation, status: "Available", notes: label };
}

export const ledger: LedgerEntry[] = [
  { id: "l1", date: "2026-05-02", item: "999 Gold Grain", movementType: "Purchase", inwardWeight: 580.42, outwardWeight: 0, balanceWeight: 580.42, source: "Veda Metals", destination: "Vault A", user: "Ravi Menon", reference: "PUR-1001", remarks: "Opening purchase" },
  { id: "l2", date: "2026-05-12", item: "916 Gold Bar", movementType: "Issue to Karigar", inwardWeight: 0, outwardWeight: 82.5, balanceWeight: 838.2, source: "Vault A", destination: "Iqbal Ansari", user: "Anika Rao", reference: "JC-2405-001", remarks: "Necklace casting" },
  { id: "l3", date: "2026-05-16", item: "916 Gold Bar", movementType: "Return from Karigar", inwardWeight: 76.9, outwardWeight: 0, balanceWeight: 915.1, source: "Iqbal Ansari", destination: "Vault A", user: "Ravi Menon", reference: "JC-2405-001", remarks: "Returned after filing" },
  { id: "l4", date: "2026-05-19", item: "VS Diamond Lot", movementType: "Issue to Production", inwardWeight: 0, outwardWeight: 3.4, balanceWeight: 34.6, source: "Gem Safe", destination: "Stone Setting", user: "Ravi Menon", reference: "JC-2405-004", remarks: "Studded bangle" },
  { id: "l5", date: "2026-05-21", item: "Fine Silver Sheet", movementType: "Adjustment", inwardWeight: 0, outwardWeight: 12, balanceWeight: 5188, source: "Vault B", destination: "Audit", user: "Dev Kapadia", reference: "ADJ-18", remarks: "Approved stock correction" }
];

export const designs: ProductDesign[] = [
  { id: "d1", designName: "Temple Lakshmi Necklace", sku: "DSN-NCK-001", category: "Necklace", metalType: "Gold", expectedMetalWeight: 86, expectedStoneWeight: 4.2, expectedWastage: 3.5, labourProcess: "CAD, casting, stone setting, polish", makingChargeType: "Per gram", bom: ["22K gold 86g", "Ruby 4.2ct", "Clasp set"], estimatedCost: 684000, sellingSuggestion: 812000, active: true },
  { id: "d2", designName: "Classic Solitaire Ring", sku: "DSN-RNG-014", category: "Ring", metalType: "Platinum", expectedMetalWeight: 8.4, expectedStoneWeight: 1.1, expectedWastage: 2, labourProcess: "CAD, casting, setting", makingChargeType: "Fixed", bom: ["Platinum 950 8.4g", "Diamond 1.1ct"], estimatedCost: 248000, sellingSuggestion: 310000, active: true },
  { id: "d3", designName: "Mango Mala Chain", sku: "DSN-CHN-022", category: "Chain", metalType: "Gold", expectedMetalWeight: 52, expectedStoneWeight: 0, expectedWastage: 2.4, labourProcess: "Handmade links, soldering, polish", makingChargeType: "Per gram", bom: ["22K gold 52g"], estimatedCost: 382000, sellingSuggestion: 452000, active: true },
  { id: "d4", designName: "Emerald Drop Earrings", sku: "DSN-ERG-009", category: "Earrings", metalType: "Gold", expectedMetalWeight: 18.5, expectedStoneWeight: 7.5, expectedWastage: 3, labourProcess: "Casting, stone setting, polish", makingChargeType: "Fixed", bom: ["18K gold 18.5g", "Emerald 7.5ct"], estimatedCost: 236000, sellingSuggestion: 298000, active: true },
  { id: "d5", designName: "Daily Wear Silver Kada", sku: "DSN-BGL-031", category: "Bangle", metalType: "Silver", expectedMetalWeight: 74, expectedStoneWeight: 0, expectedWastage: 1.8, labourProcess: "Rolling, shaping, polish", makingChargeType: "Per piece", bom: ["Silver 74g"], estimatedCost: 9800, sellingSuggestion: 14800, active: true }
];

export const orders: Order[] = [
  { id: "o1", customer: "Zaveri Retail LLP", orderNumber: "ORD-2405-001", orderDate: "2026-05-06", deliveryDate: "2026-05-30", design: "Temple Lakshmi Necklace", quantity: 2, metalType: "Gold", purityKarat: 22, advanceReceived: 250000, status: "In Production" },
  { id: "o2", customer: "Radiant Jewels", orderNumber: "ORD-2405-002", orderDate: "2026-05-07", deliveryDate: "2026-06-04", design: "Classic Solitaire Ring", quantity: 4, metalType: "Platinum", purityKarat: 23, advanceReceived: 300000, status: "Design Approval Pending" },
  { id: "o3", customer: "South Crown Stores", orderNumber: "ORD-2405-003", orderDate: "2026-05-11", deliveryDate: "2026-05-29", design: "Mango Mala Chain", quantity: 3, metalType: "Gold", purityKarat: 22, advanceReceived: 200000, status: "Quality Check" },
  { id: "o4", customer: "Aurora Boutique", orderNumber: "ORD-2405-004", orderDate: "2026-05-15", deliveryDate: "2026-06-10", design: "Emerald Drop Earrings", quantity: 6, metalType: "Gold", purityKarat: 18, advanceReceived: 150000, status: "Approved" },
  { id: "o5", customer: "Maya Silver House", orderNumber: "ORD-2405-005", orderDate: "2026-05-16", deliveryDate: "2026-05-27", design: "Daily Wear Silver Kada", quantity: 20, metalType: "Silver", purityKarat: 24, advanceReceived: 50000, status: "Ready for Delivery" }
];

export const jobCards: JobCard[] = Array.from({ length: 10 }).map((_, index) => {
  const stages = ["Casting", "Filing", "Stone Setting", "Polishing", "Quality Check", "Hallmarking"];
  const statuses = ["Material Issued", "In Progress", "Partially Returned", "Completed", "Rework"];
  const order = orders[index % orders.length];
  const expected = 22 + index * 4.7;
  const actual = index % 3 === 0 ? expected - 1.8 : expected - 0.6;
  return { id: `jc${index + 1}`, jobCardNumber: `JC-2405-${String(index + 1).padStart(3, "0")}`, orderNumber: order.orderNumber, design: order.design, karigar: ["Iqbal Ansari", "Ketan Solanki", "Prem Das"][index % 3], stage: stages[index % stages.length], materialIssued: Number((expected + 3).toFixed(2)), expectedReturn: index < 3 ? "2026-05-25" : "2026-06-02", expectedWeight: Number(expected.toFixed(2)), actualReturnWeight: Number(actual.toFixed(2)), wastage: Number((expected - actual).toFixed(2)), loss: index === 6 ? 0.4 : 0, labourCharges: 4500 + index * 750, status: statuses[index % statuses.length] };
});

export const finishedGoods = [
  { sku: "FG-NCK-001-A", design: "Temple Lakshmi Necklace", order: "ORD-2405-001", metalType: "Gold", karat: 22, grossWeight: 88.4, netWeight: 84.2, stoneWeight: 4.2, cost: 706500, selling: 824000, huid: "HUID-AU-88541", location: "Finished Vault", status: "Under QC" },
  { sku: "FG-CHN-022-C", design: "Mango Mala Chain", order: "ORD-2405-003", metalType: "Gold", karat: 22, grossWeight: 52.1, netWeight: 52.1, stoneWeight: 0, cost: 389300, selling: 458000, huid: "HUID-AU-88542", location: "Showroom Dispatch", status: "Available" },
  { sku: "FG-BGL-031-H", design: "Daily Wear Silver Kada", order: "ORD-2405-005", metalType: "Silver", karat: 24, grossWeight: 74.9, netWeight: 74.9, stoneWeight: 0, cost: 10150, selling: 14800, huid: "", location: "Dispatch", status: "Reserved" }
];

export const customers = [
  { name: "Zaveri Retail LLP", gst: "27AAAFZ4567M1Z4", phone: "+91 98765 11001", credit: 1200000, orders: 12 },
  { name: "Radiant Jewels", gst: "29AABCR8876K1Z2", phone: "+91 98765 11002", credit: 900000, orders: 8 },
  { name: "South Crown Stores", gst: "33AAXCS4562P1Z8", phone: "+91 98765 11003", credit: 700000, orders: 5 }
];

export const vendors = [
  { name: "Veda Metals", type: "Metal Supplier", gst: "27VEDAM1234F1Z8", material: "Gold bullion", outstanding: 880000 },
  { name: "Surat Gems", type: "Diamond Supplier", gst: "24SURAT9876L1Z7", material: "Diamonds", outstanding: 420000 },
  { name: "Iqbal Ansari", type: "Job Worker", gst: "", material: "Casting and filing", outstanding: 62000 }
];

export const alerts = [
  { title: "Job card delayed", message: "JC-2405-002 has crossed expected return date.", severity: "Critical" },
  { title: "High-value stock movement", message: "Diamond issue above Rs 2L requires production manager confirmation.", severity: "Warning" },
  { title: "Low 18K gold stock", message: "18K alloy is below reorder coverage for approved orders.", severity: "Warning" },
  { title: "Audit mismatch", message: "Silver adjustment ADJ-18 is pending owner approval.", severity: "Info" }
];

export const plans = [
  { name: "Starter", price: 7999, maxUsers: 5, features: ["Inventory", "Orders", "Reports"] },
  { name: "Growth", price: 18999, maxUsers: 20, features: ["Production", "Barcode", "Alerts"] },
  { name: "Enterprise Foundry", price: 49999, maxUsers: 100, features: ["Multi-location", "Advanced audit", "AI assistant"] }
];

export const rolePermissions: Record<RoleSlug, string[]> = {
  "super-admin": ["saas", "companies", "plans", "support"],
  owner: ["dashboard", "inventory", "production", "orders", "reports", "settings", "audit"],
  inventory: ["dashboard", "inventory", "ledger", "rates", "reports"],
  production: ["dashboard", "production", "job-cards", "material-movement", "reports"],
  karigar: ["job-cards", "material-return"],
  sales: ["orders", "customers", "finished-goods", "pricing"],
  accountant: ["reports", "pricing", "ledger", "audit"],
  auditor: ["dashboard", "reports", "audit"]
};
