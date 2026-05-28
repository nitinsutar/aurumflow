import Link from "next/link";
import { LogOut, Search } from "lucide-react";
import { company } from "@/lib/mock-data";
import { visibleNav } from "@/lib/navigation";
import type { SessionUser } from "@/lib/auth";

export function AppShell({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  const nav = visibleNav(user.slug);
  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <div>
            <p className="text-lg font-bold text-ink">AurumFlow</p>
            <p className="text-xs text-slate-500">Manufacturing Cloud</p>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="hidden min-w-0 lg:block">
              <p className="truncate text-sm font-semibold text-ink">{user.slug === "super-admin" ? "SaaS Owner Console" : company.name}</p>
              <p className="truncate text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 lg:max-w-xl">
              <Search className="h-4 w-4 text-slate-400" />
              <input className="w-full border-0 bg-transparent p-0 text-sm ring-0 focus:border-0 focus:ring-0" placeholder="Search orders, job cards, SKUs, karigars" />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-ink">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <form action="/api/auth/logout" method="post">
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100" title="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
