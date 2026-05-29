import { Badge, Money, Section, StatCard, Table } from "@/components/ui";
import { InventoryLive } from "@/components/inventory-live";
import { inventory } from "@/lib/mock-data";

export default function InventoryPage() {
  const lowStock = inventory.filter((item) => item.status === "Low Stock");
  const stockValue = inventory.reduce((sum, item) => sum + item.currentValue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Imitation Jewellery Inventory</h1>
        <p className="mt-1 text-sm text-slate-500">Track brass, copper, alloy, silver, CZ, AD, kundan, pearls, beads, resin, findings, hooks, clasps, chains, packaging, and finished goods.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Inventory stock value" value={<Money value={stockValue} />} />
        <StatCard label="Low stock lots" value={`${lowStock.length}`} tone="danger" />
        <StatCard label="Component lots" value={`${inventory.length}`} />
      </div>
      <InventoryLive />
      <Section title="Demo Component Lots" action={<button className="rounded-md border px-3 py-2 text-sm">Export</button>}>
        <Table headers={["Item", "Type", "Qty", "Unit", "Vendor", "Batch", "Value", "Location", "Status"]}>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="px-3 py-3 font-medium">{item.itemName}</td>
              <td className="px-3 py-3">{item.materialType}</td>
              <td className="px-3 py-3">{item.quantity.toLocaleString("en-IN")}</td>
              <td className="px-3 py-3">{item.unit}</td>
              <td className="px-3 py-3">{item.vendor}</td>
              <td className="px-3 py-3">{item.batchNumber}</td>
              <td className="px-3 py-3"><Money value={item.currentValue} /></td>
              <td className="px-3 py-3">{item.storageLocation}</td>
              <td className="px-3 py-3"><Badge tone={item.status === "Low Stock" ? "red" : "green"}>{item.status}</Badge></td>
            </tr>
          ))}
        </Table>
      </Section>
    </div>
  );
}
