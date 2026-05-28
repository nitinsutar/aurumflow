import { Badge, Money, Section, StatCard, Table } from "@/components/ui";
import { plans, users } from "@/lib/mock-data";

const companies = [
  { name: "AurumWorks Jewellery Manufacturing", status: "Active", users: 9, plan: "Enterprise Foundry", usage: "74%", payment: "Paid" },
  { name: "Nakshatra Casting Co.", status: "Active", users: 14, plan: "Growth", usage: "62%", payment: "Trial" },
  { name: "Regal Silver Works", status: "Suspended", users: 3, plan: "Starter", usage: "18%", payment: "Overdue" }
];

export default function SuperAdminPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Super Admin Panel</h1><div className="grid gap-4 md:grid-cols-4"><StatCard label="Companies" value={`${companies.length}`} /><StatCard label="Active users" value={`${users.length + 17}`} /><StatCard label="MRR placeholder" value="Rs 76,997" tone="gold" /><StatCard label="Support requests" value="4" /></div><Section title="Registered Companies" action={<button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">Create company</button>}><Table headers={["Company", "Status", "Active Users", "Plan", "Usage", "Payment", "Actions"]}>{companies.map((company) => <tr key={company.name}><td className="px-3 py-3 font-medium">{company.name}</td><td className="px-3 py-3"><Badge tone={company.status === "Suspended" ? "red" : "green"}>{company.status}</Badge></td><td className="px-3 py-3">{company.users}</td><td className="px-3 py-3">{company.plan}</td><td className="px-3 py-3">{company.usage}</td><td className="px-3 py-3">{company.payment}</td><td className="px-3 py-3"><button className="rounded-md border px-3 py-1.5 text-xs">Edit / suspend</button></td></tr>)}</Table></Section><Section title="Subscription Plans and Feature Access"><Table headers={["Plan", "Price", "Max Users", "Features"]}>{plans.map((plan) => <tr key={plan.name}><td className="px-3 py-3 font-medium">{plan.name}</td><td className="px-3 py-3"><Money value={plan.price} /></td><td className="px-3 py-3">{plan.maxUsers}</td><td className="px-3 py-3">{plan.features.join(", ")}</td></tr>)}</Table></Section></div>;
}
