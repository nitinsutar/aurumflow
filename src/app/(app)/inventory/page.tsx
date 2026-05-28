import { Badge, Money, Section, StatCard, Table } from "@/components/ui";
import { InventoryLive } from "@/components/inventory-live";
import { inventory } from "@/lib/mock-data";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Raw Material Inventory</h1>
          <p className="mt-1 text-sm text-slate-500">Weight-based lots for metals, diamonds, stones, pearls, findings, and accessories.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total demo stock value" value={<Money value={inventory.reduce((s, i) => s + i.currentValue, 0)} />} />
        <StatCard label="Demo fine gold equivalent" value={`${inventory.filter((i) => i.materialType === "Gold").reduce((s, i) => s + i.fineEquivalent, 0).toFixed(2)} g`} tone="gold" />
        <StatCard label="Demo gem lots" value={`${inventory.filter((i) => ["Diamond", "Gemstone"].includes(i.materialType)).length}`} />
      </div>
      <InventoryLive />
      <Section
        title="Demo Inventory Lots"
        action={<div className="flex gap-2"><select><option>All material types</option></select><button className="rounded-md border px-3 py-2 text-sm">Export</button></div>}
      >
        <Table headers={["Item", "Material", "Purity", "Gross", "Net", "Fine Eq.", "Qty", "Vendor", "Batch", "Value", "Location", "Status"]}>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="px-3 py-3 font-medium">{item.itemName}</td>
              <td className="px-3 py-3">{item.materialType}</td>
              <td className="px-3 py-3">{item.purityKarat ? `${item.purityKarat}K` : "-"}</td>
              <td className="px-3 py-3">{item.grossWeight} {item.unit}</td>
              <td className="px-3 py-3">{item.netWeight} {item.unit}</td>
              <td className="px-3 py-3">{item.fineEquivalent}</td>
              <td className="px-3 py-3">{item.quantity || "-"}</td>
              <td className="px-3 py-3">{item.vendor}</td>
              <td className="px-3 py-3">{item.batchNumber}</td>
              <td className="px-3 py-3"><Money value={item.currentValue} /></td>
              <td className="px-3 py-3">{item.storageLocation}</td>
              <td className="px-3 py-3"><Badge tone={item.status === "Reserved" ? "gold" : "green"}>{item.status}</Badge></td>
            </tr>
          ))}
        </Table>
      </Section>
    </div>
  );
}
