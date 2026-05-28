import { company } from "@/lib/mock-data";
import { Section } from "@/components/ui";

const settings = ["Company profile", "Users and roles", "Departments/locations", "Metal purity settings", "GST settings", "Numbering format for orders/job cards/SKUs", "Barcode label format", "Subscription plan placeholder"];

export default function SettingsPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">Settings</h1><div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><Section title="Company Profile"><form className="grid gap-3"><input defaultValue={company.name} /><input defaultValue={company.legalName} /><input defaultValue={company.gstNumber} /><textarea defaultValue="Manufacturing unit, Zaveri Bazaar, Mumbai" /><button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">Save profile</button></form></Section><Section title="Configuration Areas"><div className="grid gap-3 md:grid-cols-2">{settings.map((setting) => <div className="rounded-md border border-slate-200 p-4" key={setting}><p className="font-medium text-ink">{setting}</p><p className="mt-1 text-sm text-slate-500">Ready for tenant-specific configuration.</p></div>)}</div></Section></div></div>;
}
