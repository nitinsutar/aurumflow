import { Money, Section, Table } from "@/components/ui";
import { customers } from "@/lib/mock-data";

export default function CustomersPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Customer / Retailer Management</h1><Section title="Retailers and Clients"><Table headers={["Customer", "GST", "Contact", "Credit Limit", "Order History", "Payment History"]}>{customers.map((customer) => <tr key={customer.name}><td className="px-3 py-3 font-medium">{customer.name}</td><td className="px-3 py-3">{customer.gst}</td><td className="px-3 py-3">{customer.phone}</td><td className="px-3 py-3"><Money value={customer.credit} /></td><td className="px-3 py-3">{customer.orders} orders</td><td className="px-3 py-3 text-slate-500">Placeholder</td></tr>)}</Table></Section></div>;
}
