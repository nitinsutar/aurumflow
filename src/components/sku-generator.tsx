"use client";

import { useMemo, useState } from "react";
import { Copy, Wand2 } from "lucide-react";
import { baseMaterials, embellishments, finishes, generateSku } from "@/lib/fashion-data";

export function SkuGenerator() {
  const [form, setForm] = useState({ category: "Earrings", designCode: "ER-CZ-104", baseMaterial: "Brass", finish: "Rose Gold", embellishment: "CZ", size: "Standard" });
  const sku = useMemo(() => generateSku(form), [form]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2"><Wand2 className="h-4 w-4 text-gold" /><h2 className="font-semibold text-ink">Attribute-Based SKU Generator</h2></div>
      <div className="grid gap-3 md:grid-cols-3">
        <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Category" />
        <input value={form.designCode} onChange={(event) => setForm({ ...form, designCode: event.target.value })} placeholder="Design code" />
        <select value={form.baseMaterial} onChange={(event) => setForm({ ...form, baseMaterial: event.target.value })}>{baseMaterials.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={form.finish} onChange={(event) => setForm({ ...form, finish: event.target.value })}>{finishes.map((item) => <option key={item}>{item}</option>)}</select>
        <select value={form.embellishment} onChange={(event) => setForm({ ...form, embellishment: event.target.value })}>{embellishments.map((item) => <option key={item}>{item}</option>)}</select>
        <input value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} placeholder="Size" />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 p-4">
        <div><p className="text-xs font-medium uppercase text-slate-500">Generated SKU</p><p className="mt-1 font-mono text-lg font-semibold text-ink">{sku}</p></div>
        <button type="button" onClick={() => navigator.clipboard?.writeText(sku)} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"><Copy className="h-4 w-4" /> Copy</button>
      </div>
    </div>
  );
}
