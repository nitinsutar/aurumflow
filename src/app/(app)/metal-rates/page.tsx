import { Section, Table } from "@/components/ui";

const rates = [
  { date: "2026-05-28", material: "Gold", purity: "24K", rate: 6420 },
  { date: "2026-05-28", material: "Gold", purity: "22K", rate: 5960 },
  { date: "2026-05-28", material: "Gold", purity: "18K", rate: 4880 },
  { date: "2026-05-28", material: "Silver", purity: "999", rate: 86 },
  { date: "2026-05-28", material: "Platinum", purity: "950", rate: 3320 }
];

export default function MetalRatesPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Daily Metal Rates</h1><Section title="Save Rate"><form className="grid gap-3 md:grid-cols-5"><select><option>Gold</option><option>Silver</option><option>Platinum</option></select><input placeholder="Purity/Karat" defaultValue="22K" /><input placeholder="Rate per gram" defaultValue="5960" /><input type="date" defaultValue="2026-05-28" /><button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">Save rate</button></form></Section><Section title="Rate History"><Table headers={["Date", "Material", "Purity", "Rate / gram"]}>{rates.map((rate) => <tr key={`${rate.material}-${rate.purity}`}><td className="px-3 py-3">{rate.date}</td><td className="px-3 py-3">{rate.material}</td><td className="px-3 py-3">{rate.purity}</td><td className="px-3 py-3">Rs {rate.rate.toLocaleString("en-IN")}</td></tr>)}</Table></Section></div>;
}
