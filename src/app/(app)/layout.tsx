import { AppShell } from "@/components/app-shell";
import { requireSession } from "@/lib/auth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = requireSession();
  return <AppShell user={user}>{children}</AppShell>;
}
