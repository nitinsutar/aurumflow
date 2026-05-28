import { Badge, Money, Section, StatCard, Table } from "@/components/ui";
import { alerts, finishedGoods, inventory, jobCards, ledger, orders } from "@/lib/mock-data";

export default function DashboardPage() {
  const rawValue = inventory.reduce((sum, item) => sum + item.currentValue, 0);
  const gold = inventory.filter((item) => item.materialType === "Gold");
  const delayed = jobCards.filter((job) => new Date(job.expectedReturn) < new Date("2026-05-28") && job.status !== "Completed");
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-semibold text-ink">Company Dashboard</h1><p className="mt-1 text-sm text-slate-500">Live operational cockpit for stock, production, orders, and alerts.</p></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Raw material stock value" value={<Money value={rawValue} />} helper={`${inventory.length} active lots`} tone="gold" />
        <StatCard label="Stock with karigars" value={`${jobCards.reduce((s, j) => s + j.materialIssued, 0).toFixed(1)} g`} helper="Issued across open job cards" />
        <StatCard label="Finished goods" value={`${finishedGoods.length}`} helper={<Money value={finishedGoods.reduce((s, f) => s + f.selling, 0)} />} tone="success" />
        <StatCard label="Pending orders" value={`${orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length}`} helper={`${delayed.length} delayed job cards`} tone="danger" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_.8fr]">
        <Section title="Gold Stock by Karat"><div className="space-y-4">{gold.map((item) => <div key={item.id}><div className="mb-1 flex justify-between text-sm"><span>{item.purityKarat}K - {item.itemName}</span><span className="font-semibold">{item.netWeight} g</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-gold" style={{ width: `${Math.min(100, item.netWeight / 10)}%` }} /></div><p className="mt-1 text-xs text-slate-500">Fine equivalent: {item.fineEquivalent} g</p></div>)}</div></Section>
        <Section title="Smart Alerts"><div className="space-y-3">{alerts.map((alert) => <div className="rounded-md border border-slate-200 p-3" key={alert.title}><div className="flex items-center justify-between gap-2"><p className="font-medium text-ink">{alert.title}</p><Badge tone={alert.severity === "Critical" ? "red" : alert.severity === "Warning" ? "gold" : "blue"}>{alert.severity}</Badge></div><p className="mt-1 text-sm text-slate-500">{alert.message}</p></div>)}</div></Section>
      </div>
      <Section title="Recent Inventory Movements"><Table headers={["Date", "Item", "Type", "In", "Out", "Balance", "Reference"]}>{ledger.map((entry) => <tr key={entry.id}><td className="px-3 py-3">{entry.date}</td><td className="px-3 py-3 font-medium">{entry.item}</td><td className="px-3 py-3"><Badge>{entry.movementType}</Badge></td><td className="px-3 py-3">{entry.inwardWeight}</td><td className="px-3 py-3">{entry.outwardWeight}</td><td className="px-3 py-3">{entry.balanceWeight}</td><td className="px-3 py-3">{entry.reference}</td></tr>)}</Table></Section>
    </div>
  );
}
