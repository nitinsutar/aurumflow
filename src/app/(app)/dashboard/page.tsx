import { Badge, Money, Section, StatCard, Table } from "@/components/ui";
import { alerts, finishedGoods, inventory, ledger, orders } from "@/lib/mock-data";
import { componentInventory, variantInventory } from "@/lib/fashion-data";

export default function DashboardPage() {
  const stockValue = inventory.reduce((sum, item) => sum + item.currentValue, 0);
  const lowComponents = componentInventory.filter((item) => item.stock <= item.reorderPoint);
  const totalFinished = finishedGoods.reduce((sum, item) => sum + item.selling, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Imitation Jewellery Inventory Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Focused view of SKU variants, components, returns, stock value, billing status, and reorder alerts.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Component stock value" value={<Money value={stockValue} />} helper={`${inventory.length} material/component lots`} tone="gold" />
        <StatCard label="Finished variant value" value={<Money value={totalFinished} />} helper={`${finishedGoods.length} finished SKU examples`} tone="success" />
        <StatCard label="Low component alerts" value={`${lowComponents.length}`} helper="Findings, hooks, clasps, pearls" tone="danger" />
        <StatCard label="Billing pending orders" value={`${orders.filter((order) => order.status.includes("Billing")).length}`} helper={`${orders.length} active client orders`} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_.8fr]">
        <Section title="Fast / Slow Moving Variants">
          <Table headers={["SKU", "Design", "Finish", "Stock", "Velocity", "Signal"]}>
            {variantInventory.map((item) => (
              <tr key={item.sku}>
                <td className="px-3 py-3 font-mono text-xs">{item.sku}</td>
                <td className="px-3 py-3 font-medium">{item.designName}</td>
                <td className="px-3 py-3">{item.finish}</td>
                <td className="px-3 py-3">{item.stock}</td>
                <td className="px-3 py-3">{item.velocity30d}/30d</td>
                <td className="px-3 py-3"><Badge tone={item.lastSoldDays >= 60 ? "red" : item.stock <= item.reorderPoint ? "gold" : "green"}>{item.lastSoldDays >= 60 ? "Dead stock" : item.stock <= item.reorderPoint ? "Reorder" : "Healthy"}</Badge></td>
              </tr>
            ))}
          </Table>
        </Section>
        <Section title="Alerts">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div className="rounded-md border border-slate-200 p-3" key={alert.title}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-ink">{alert.title}</p>
                  <Badge tone={alert.severity === "Critical" ? "red" : alert.severity === "Warning" ? "gold" : "blue"}>{alert.severity}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{alert.message}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Section title="Recent Stock Ledger">
        <Table headers={["Date", "Item", "Type", "In Qty", "Out Qty", "Balance Qty", "Reference"]}>
          {ledger.map((entry) => (
            <tr key={entry.id}>
              <td className="px-3 py-3">{entry.date}</td>
              <td className="px-3 py-3 font-medium">{entry.item}</td>
              <td className="px-3 py-3"><Badge>{entry.movementType}</Badge></td>
              <td className="px-3 py-3">{entry.inwardQty || "-"}</td>
              <td className="px-3 py-3">{entry.outwardQty || "-"}</td>
              <td className="px-3 py-3">{entry.balanceQty || "-"}</td>
              <td className="px-3 py-3">{entry.reference}</td>
            </tr>
          ))}
        </Table>
      </Section>
    </div>
  );
}
