import { Gem } from "lucide-react";
import { users } from "@/lib/mock-data";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
      <section className="flex items-center justify-center bg-ink px-6 py-12 text-white">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-white">
            <Gem className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">JewelSuite</h1>
          <p className="mt-5 text-lg text-slate-300">Focused inventory platform for imitation jewellery manufacturers managing SKU variants, components, returns, billing-ready stock, and reorder insights.</p>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {["SKU variants", "Variant images", "Components & BOM", "Returns to stock", "Dead stock alerts", "Role dashboards"].map((item) => (
              <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-ink">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Use a demo account. Password: `password123`.</p>
          <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <select name="email" className="mt-2 w-full">
                {users.map((user) => (
                  <option key={user.email} value={user.email}>{user.email} - {user.role}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input name="password" type="password" defaultValue="password123" className="mt-2 w-full" />
            </label>
            <button className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Enter dashboard</button>
          </form>
        </div>
      </section>
    </main>
  );
}
