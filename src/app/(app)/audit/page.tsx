import { Badge, Section, Table } from "@/components/ui";

const logs = [["2026-05-28 10:21", "Ravi Menon", "Issued material", "InventoryLedger", "JC-2405-004"], ["2026-05-27 18:02", "Dev Kapadia", "Requested adjustment approval", "InventoryItem", "ADJ-18"], ["2026-05-27 14:44", "Meera Shah", "Confirmed sensitive action", "StockAdjustment", "ADJ-17"], ["2026-05-26 09:10", "Anika Rao", "Updated job card stage", "JobCard", "JC-2405-003"]];

export default function AuditPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Audit & Security</h1><Section title="Controls"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{["Activity logs", "User-wise action history", "Stock adjustment approval", "Soft-delete audit trail", "Role restrictions", "Sensitive action confirmation", "Inventory movement trail", "Negative stock override log"].map((control) => <div className="rounded-md border border-slate-200 p-4" key={control}><Badge tone="green">Active</Badge><p className="mt-2 font-medium">{control}</p></div>)}</div></Section><Section title="Recent Activity"><Table headers={["Time", "User", "Action", "Entity", "Reference"]}>{logs.map((log) => <tr key={log.join()}>{log.map((cell) => <td className="px-3 py-3" key={cell}>{cell}</td>)}</tr>)}</Table></Section></div>;
}
