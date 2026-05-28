import { Badge, Section } from "@/components/ui";
import { alerts } from "@/lib/mock-data";

export default function AlertsPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Smart Alerts</h1><Section title="Active Alert Rules"><div className="grid gap-3 md:grid-cols-2">{["Low stock alert", "Excess wastage alert", "Job card delayed alert", "Order delivery date approaching", "Material not returned by karigar", "Negative stock warning", "High-value stock movement warning", "Audit mismatch alert"].map((rule) => <div className="rounded-md border border-slate-200 p-4" key={rule}><div className="flex items-center justify-between gap-3"><p className="font-medium text-ink">{rule}</p><Badge tone="green">Enabled</Badge></div></div>)}</div></Section><Section title="Current Alerts"><div className="space-y-3">{alerts.map((alert) => <div className="rounded-md border p-4" key={alert.title}><Badge tone={alert.severity === "Critical" ? "red" : "gold"}>{alert.severity}</Badge><p className="mt-2 font-medium">{alert.title}</p><p className="text-sm text-slate-500">{alert.message}</p></div>)}</div></Section></div>;
}
