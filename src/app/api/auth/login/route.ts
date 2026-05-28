import { NextResponse } from "next/server";
import { cookieName, sessionCookieFor } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const session = password === "password123" ? sessionCookieFor(email) : null;
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  const response = NextResponse.redirect(new URL(email.startsWith("super@") ? "/super-admin" : "/dashboard", request.url));
  response.cookies.set(cookieName, session, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
