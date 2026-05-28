"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { RefreshCw, Save } from "lucide-react";
import { Badge, Section } from "@/components/ui";

type LiveItem = {
  id: string;
  itemName: string;
  materialType: string;
  purityKarat?: string | number | null;
  grossWeight: string | number;
  netWeight: string | number;
  fineEquivalent: string | number;
  quantity: string | number;
  unit: string;
  batchNumber: string;
  purchaseRate: string | number;
  currentValue: string | number;
  storageLocation?: string | null;
  status: string;
  createdAt: string;
};

const materialTypes = ["GOLD", "SILVER", "PLATINUM", "DIAMOND", "GEMSTONE", "PEARL", "FINDING", "ACCESSORY"];

export function InventoryLive() {
  const [items, setItems] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadItems() {
    setLoading(true);
    setError("");
    const response = await fetch("/api/inventory", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to load inventory");
    else setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to create inventory lot");
    else {
      event.currentTarget.reset();
      await loadItems();
    }
    setSaving(false);
  }

  const totalValue = useMemo(() => items.reduce((sum, item) => sum + Number(item.currentValue || 0), 0), [items]);

  return (
    <Section
      title="Live Supabase Inventory"
      action={
        <button onClick={loadItems} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm" type="button">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
        <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="itemName" placeholder="Item name" required />
            <select name="materialType" required>
              {materialTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input name="purityKarat" placeholder="Karat, e.g. 22" type="number" step="0.01" />
            <input name="grossWeight" placeholder="Gross weight" type="number" step="0.001" required />
            <input name="netWeight" placeholder="Net weight" type="number" step="0.001" required />
            <input name="quantity" placeholder="Quantity" type="number" step="0.001" />
            <input name="unit" placeholder="Unit" defaultValue="g" />
            <input name="batchNumber" placeholder="Batch number" required />
            <input name="purchaseRate" placeholder="Purchase rate" type="number" step="0.01" required />
            <input name="storageLocation" placeholder="Storage location" />
          </div>
          <button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Create lot and ledger entry"}
          </button>
          {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
        </form>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">{loading ? "Loading..." : `${items.length} database lots`}</p>
            <p className="text-sm font-semibold text-ink">Rs {Math.round(totalValue).toLocaleString("en-IN")}</p>
          </div>
          <div className="max-h-[480px] space-y-3 overflow-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{item.itemName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.materialType} {item.purityKarat ? `/${item.purityKarat}K` : ""} - Batch {item.batchNumber}
                    </p>
                  </div>
                  <Badge tone={item.status === "AVAILABLE" ? "green" : "gold"}>{item.status}</Badge>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                  <span>Gross: {Number(item.grossWeight).toFixed(3)} {item.unit}</span>
                  <span>Net: {Number(item.netWeight).toFixed(3)} {item.unit}</span>
                  <span>Fine eq: {Number(item.fineEquivalent).toFixed(3)}</span>
                  <span>Rate: Rs {Number(item.purchaseRate).toLocaleString("en-IN")}</span>
                  <span>Value: Rs {Math.round(Number(item.currentValue)).toLocaleString("en-IN")}</span>
                  <span>{item.storageLocation || "No location"}</span>
                </div>
              </div>
            ))}
            {!loading && items.length === 0 ? <p className="rounded-md border border-dashed p-5 text-sm text-slate-500">No database inventory yet. Create the first lot from the form.</p> : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
