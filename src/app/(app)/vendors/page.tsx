import { Money, Section, Table } from "@/components/ui";
import { vendors } from "@/lib/mock-data";

export default function VendorsPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Vendor Management</h1><Section title="Suppliers and Job Workers"><Table headers={["Vendor", "Type", "GST", "Material Supplied", "Purchase History", "Outstanding"]}>{vendors.map((vendor) => <tr key={vendor.name}><td className="px-3 py-3 font-medium">{vendor.name}</td><td className="px-3 py-3">{vendor.type}</td><td className="px-3 py-3">{vendor.gst || "-"}</td><td className="px-3 py-3">{vendor.material}</td><td className="px-3 py-3 text-slate-500">Placeholder</td><td className="px-3 py-3"><Money value={vendor.outstanding} /></td></tr>)}</Table></Section></div>;
}
