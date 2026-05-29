export const baseMaterials = ["Brass", "Copper", "Alloy", "Silver"];
export const finishes = ["High Gold", "Matte Gold", "Rose Gold", "Silver", "Antique", "Rhodium"];
export const embellishments = ["CZ", "AD", "Kundan", "Pearls", "Glass Beads", "Resin"];

export const variantInventory = [
  { designCode: "ER-CZ-104", designName: "Oval Halo CZ Earrings", manufacturer: "AurumFlow Studio", category: "Earrings", baseMaterial: "Brass", finish: "Rose Gold", embellishment: "CZ", size: "Standard", sku: "ER-CZ104-BRS-RG-CZ-STD", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80", stock: 84, reserved: 12, reorderPoint: 30, lastSoldDays: 4, velocity30d: 68 },
  { designCode: "NK-KD-221", designName: "Kundan Choker Set", manufacturer: "AurumFlow Studio", category: "Necklace Set", baseMaterial: "Alloy", finish: "Antique", embellishment: "Kundan", size: "Adjustable 16-20 in", sku: "NK-KD221-ALY-ANT-KD-ADJ16", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80", stock: 18, reserved: 6, reorderPoint: 25, lastSoldDays: 2, velocity30d: 42 },
  { designCode: "BG-PL-088", designName: "Pearl Bangle", manufacturer: "AurumFlow Studio", category: "Bangle", baseMaterial: "Copper", finish: "Matte Gold", embellishment: "Pearls", size: "2.6", sku: "BG-PL088-COP-MG-PRL-26", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80", stock: 7, reserved: 1, reorderPoint: 20, lastSoldDays: 82, velocity30d: 2 },
  { designCode: "RG-AD-310", designName: "Adjustable AD Ring", manufacturer: "AurumFlow Studio", category: "Ring", baseMaterial: "Silver", finish: "Rhodium", embellishment: "AD", size: "Adjustable", sku: "RG-AD310-SLV-RHD-AD-ADJ", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80", stock: 123, reserved: 20, reorderPoint: 40, lastSoldDays: 1, velocity30d: 91 }
];

export const componentInventory = [
  { code: "CMP-CZ-2MM", name: "CZ Round 2mm", type: "Loose Stone", stock: 8400, unit: "pcs", reorderPoint: 2500, usedIn: ["ER-CZ104", "RG-AD310"] },
  { code: "CMP-PEARL-4MM", name: "Hanging Pearl 4mm", type: "Pearl", stock: 620, unit: "pcs", reorderPoint: 900, usedIn: ["BG-PL088"] },
  { code: "CMP-HOOK-01", name: "Earring Hooks", type: "Finding", stock: 230, unit: "pairs", reorderPoint: 500, usedIn: ["ER-CZ104"] },
  { code: "CMP-CLASP-LOB", name: "Lobster Clasp", type: "Finding", stock: 140, unit: "pcs", reorderPoint: 300, usedIn: ["NK-KD221"] },
  { code: "CMP-CHAIN-18", name: "Adjustable Chain 18 in", type: "Chain", stock: 96, unit: "pcs", reorderPoint: 150, usedIn: ["NK-KD221"] }
];

export const bundleDefinitions = [
  { bundleSku: "SET-BRIDAL-KD221", name: "Kundan Bridal Set", stock: 9, components: [{ sku: "NK-KD221-ALY-ANT-KD-ADJ16", qty: 1 }, { sku: "ER-CZ104-BRS-RG-CZ-STD", qty: 1 }] },
  { bundleSku: "SET-DAILY-RG310", name: "Daily AD Ring Pair", stock: 41, components: [{ sku: "RG-AD310-SLV-RHD-AD-ADJ", qty: 2 }] }
];

export const returns = [
  { returnNo: "RET-2406-001", client: "Zaveri Retail LLP", sku: "ER-CZ104-BRS-RG-CZ-STD", qty: 6, condition: "Sellable", action: "Add back to inventory" },
  { returnNo: "RET-2406-002", client: "Maya Fashion", sku: "BG-PL088-COP-MG-PRL-26", qty: 3, condition: "Needs QC", action: "Hold for inspection" }
];

export function generateSku(input: { category: string; designCode: string; baseMaterial: string; finish: string; embellishment: string; size: string }) {
  const clean = (value: string, length = 4) => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, length);
  return [clean(input.category, 2), clean(input.designCode, 6), clean(input.baseMaterial, 3), clean(input.finish, 3), clean(input.embellishment, 3), clean(input.size, 5)].join("-");
}
