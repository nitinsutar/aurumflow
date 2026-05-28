import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { users } from "@/lib/mock-data";
import type { RoleSlug } from "@/lib/types";

export type SessionUser = {
  name: string;
  email: string;
  role: string;
  slug: RoleSlug;
  companyId?: string;
};

const cookieName = "jewelsuite_user";

export function getSession(): SessionUser | null {
  const raw = cookies().get(cookieName)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export function requireSession() {
  const session = getSession();
  if (!session) redirect("/login");
  return session;
}

export function sessionCookieFor(email: string) {
  const found = users.find((user) => user.email === email);
  if (!found) return null;
  const session: SessionUser = {
    name: found.name,
    email: found.email,
    role: found.role,
    slug: found.slug,
    companyId: found.slug === "super-admin" ? undefined : "aurum"
  };
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export { cookieName };
