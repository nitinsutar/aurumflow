import { UserManagement } from "@/components/user-management";

export default function UsersPage() {
  return <div className="space-y-6"><div><h1 className="text-2xl font-semibold text-ink">Users & Roles</h1><p className="mt-1 text-sm text-slate-500">Super admins and company owners can create users, assign roles, and generate login passwords.</p></div><UserManagement /></div>;
}
