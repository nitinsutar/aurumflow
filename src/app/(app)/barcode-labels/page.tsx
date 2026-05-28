import { Section } from "@/components/ui";
import { finishedGoods, inventory, jobCards } from "@/lib/mock-data";

const labels = [
  ...inventory.slice(0, 3).map((item) => ({ code: `LOT-${item.batchNumber}`, title: item.itemName, meta: `${item.materialType} ${item.netWeight}${item.unit}`, type: "Raw material lot" })),
  ...jobCards.slice(0, 3).map((job) => ({ code: job.jobCardNumber, title: job.design, meta: `${job.karigar} / ${job.stage}`, type: "Job card" })),
  ...finishedGoods.map((item) => ({ code: item.sku, title: item.design, meta: `${item.metalType} ${item.netWeight}g`, type: "Finished good" }))
];

export default function BarcodeLabelsPage() {
  return <div className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold text-ink">Printable Barcode Labels</h1><p className="mt-1 text-sm text-slate-500">Barcode labels for raw material lots, job cards, and finished goods. RFID fields are reserved for future tags.</p></div><button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white print:hidden">Print labels</button></div><Section title="Labels"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{labels.map((label) => <div className="aspect-[1.85/1] rounded-md border border-slate-300 bg-white p-4" key={label.code}><div className="flex justify-between gap-3 text-xs text-slate-500"><span>{label.type}</span><span>RFID: future-ready</span></div><p className="mt-2 truncate text-sm font-semibold text-ink">{label.title}</p><p className="truncate text-xs text-slate-500">{label.meta}</p><div className="barcode mt-4 h-10 rounded-sm" /><p className="mt-2 text-center font-mono text-sm tracking-wide">{label.code}</p></div>)}</div></Section></div>;
}
