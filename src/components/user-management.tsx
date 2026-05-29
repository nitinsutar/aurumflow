"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { KeyRound, RefreshCw, UserPlus } from "lucide-react";
import { Badge, Section } from "@/components/ui";

type Role = { id: string; name: string; slug: string };
type User = { id: string; name: string; email: string; active: boolean; role?: Role | null; company?: { name: string } | null };

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setError("");
    const response = await fetch("/api/users", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to load users");
    else { setUsers(data.users || []); setRoles(data.roles || []); }
  }

  useEffect(() => { load(); }, []);

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setGeneratedPassword("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Unable to create user");
    else { setGeneratedPassword(data.generatedPassword); event.currentTarget.reset(); await load(); }
    setSaving(false);
  }

  return <div className="space-y-6"><Section title="Create User & Generate Password" action={<button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Refresh</button>}><form onSubmit={createUser} className="grid gap-3 md:grid-cols-4"><input name="name" placeholder="Full name" required /><input name="email" placeholder="Email" type="email" required /><select name="roleId" required><option value="">Select role</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select><button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"><UserPlus className="h-4 w-4" /> {saving ? "Creating..." : "Create user"}</button></form>{generatedPassword ? <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-900"><KeyRound className="h-4 w-4" /> Generated password</div><p className="mt-2 font-mono text-lg">{generatedPassword}</p></div> : null}{error ? <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}</Section><Section title="Users"><div className="space-y-3">{users.map((user) => <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 p-4"><div><p className="font-medium text-ink">{user.name}</p><p className="text-sm text-slate-500">{user.email} {user.company?.name ? `- ${user.company.name}` : ""}</p></div><div className="flex items-center gap-2"><Badge tone="blue">{user.role?.name || "No role"}</Badge><Badge tone={user.active ? "green" : "red"}>{user.active ? "Active" : "Inactive"}</Badge></div></div>)}</div></Section></div>;
}
