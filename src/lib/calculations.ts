export function purityPercentage(karat?: number, customPurityPct?: number) {
  if (customPurityPct) return customPurityPct;
  if (!karat) return 100;
  return Number(((karat / 24) * 100).toFixed(3));
}

export function fineMetalEquivalent(netWeight: number, karat?: number, customPurityPct?: number) {
  return Number(((netWeight * purityPercentage(karat, customPurityPct)) / 100).toFixed(3));
}

export function calculatePricing(input: {
  netMetalWeight: number;
  currentMetalRate: number;
  stoneCost: number;
  makingCharge: number;
  wastagePercentage: number;
  marginPercentage: number;
  gstPercentage: number;
}) {
  const metalValue = input.netMetalWeight * input.currentMetalRate;
  const wastageValue = (metalValue * input.wastagePercentage) / 100;
  const subtotalBeforeMargin = metalValue + wastageValue + input.makingCharge + input.stoneCost;
  const margin = (subtotalBeforeMargin * input.marginPercentage) / 100;
  const subtotal = subtotalBeforeMargin + margin;
  const gst = (subtotal * input.gstPercentage) / 100;
  return {
    metalValue,
    wastageValue,
    makingCharge: input.makingCharge,
    stoneValue: input.stoneCost,
    subtotal,
    gst,
    finalSellingPrice: subtotal + gst
  };
}

export function canIssueStock(currentWeight: number, issueWeight: number, adminOverride = false) {
  return adminOverride || currentWeight - issueWeight >= 0;
}

export function wastage(expectedWeight: number, actualReturnWeight: number, scrap = 0) {
  return Math.max(0, Number((expectedWeight - actualReturnWeight - scrap).toFixed(3)));
}
