import { clsx } from "clsx";
import type React from "react";

export function StatCard({ label, value, helper, tone = "default" }: { label: string; value: React.ReactNode; helper?: React.ReactNode; tone?: "default" | "gold" | "danger" | "success" }) {
  return (
    <div className={clsx("rounded-lg border bg-white p-5 shadow-soft", tone === "gold" && "border-gold/30", tone === "danger" && "border-ruby/25", tone === "success" && "border-emerald/25")}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "gold" | "green" | "red" | "blue" }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "slate" && "bg-slate-100 text-slate-700",
        tone === "gold" && "bg-amber-100 text-amber-800",
        tone === "green" && "bg-emerald-100 text-emerald-800",
        tone === "red" && "bg-rose-100 text-rose-800",
        tone === "blue" && "bg-sky-100 text-sky-800"
      )}
    >
      {children}
    </span>
  );
}

export function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            {headers.map((header) => (
              <th className="whitespace-nowrap px-3 py-3 font-semibold" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}

export function Money({ value }: { value: number }) {
  return <>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)}</>;
}

export function EmptyHint({ text }: { text: string }) {
  return <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">{text}</div>;
}
