export type RoleSlug = "super-admin" | "company-admin" | "inventory-manager" | "billing-manager";

export type MaterialType =
  | "Brass"
  | "Copper"
  | "Alloy"
  | "Silver"
  | "CZ"
  | "AD"
  | "Kundan"
  | "Pearl"
  | "Glass Bead"
  | "Resin"
  | "Finding"
  | "Chain"
  | "Clasp"
  | "Hook"
  | "Packaging"
  | "Finished Good";

export type InventoryItem = {
  id: string;
  itemName: string;
  materialType: MaterialType;
  grossWeight: number;
  netWeight: number;
  fineEquivalent: number;
  quantity: number;
  unit: string;
  vendor: string;
  batchNumber: string;
  purchaseDate: string;
  purchaseRate: number;
  currentValue: number;
  storageLocation: string;
  status: string;
  notes?: string;
};

export type LedgerEntry = {
  id: string;
  date: string;
  item: string;
  movementType: string;
  inwardWeight: number;
  outwardWeight: number;
  balanceWeight: number;
  inwardQty?: number;
  outwardQty?: number;
  balanceQty?: number;
  source: string;
  destination: string;
  user: string;
  reference: string;
  remarks: string;
};

export type ProductDesign = {
  id: string;
  designName: string;
  sku: string;
  category: string;
  metalType: MaterialType;
  expectedMetalWeight: number;
  expectedStoneWeight: number;
  expectedWastage: number;
  labourProcess: string;
  makingChargeType: string;
  bom: string[];
  estimatedCost: number;
  sellingSuggestion: number;
  active: boolean;
};

export type Order = {
  id: string;
  customer: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string;
  design: string;
  quantity: number;
  metalType: MaterialType;
  purityKarat: number;
  advanceReceived: number;
  status: string;
};

export type JobCard = {
  id: string;
  jobCardNumber: string;
  orderNumber: string;
  design: string;
  karigar: string;
  stage: string;
  materialIssued: number;
  expectedReturn: string;
  expectedWeight: number;
  actualReturnWeight: number;
  wastage: number;
  loss: number;
  labourCharges: number;
  status: string;
};
