import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generatePassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const allowedCreators = new Set(["super-admin", "company-admin"]);

async function resolveCompanyId(candidate?: string) {
  if (candidate) {
    const company = await prisma.company.findUnique({ where: { id: candidate }, select: { id: true } });
    if (company) return company.id;
  }
  return (await prisma.company.findFirst({ where: { status: "ACTIVE" }, select: { id: true } }))?.id;
}

export async function GET() {
  const session = getSession();
  if (!session || !allowedCreators.has(session.slug)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const companyId = await resolveCompanyId(session.companyId);
  const users = await prisma.user.findMany({
    where: session.slug === "super-admin" ? {} : { companyId },
    include: { role: true, company: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  const roles = await prisma.role.findMany({
    where: session.slug === "super-admin" ? {} : { companyId },
    orderBy: { name: "asc" }
  });
  return NextResponse.json({ users, roles });
}

export async function POST(request: Request) {
  const session = getSession();
  if (!session || !allowedCreators.has(session.slug)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const companyId = await resolveCompanyId(session.companyId || body.companyId);
    if (!companyId && session.slug !== "super-admin") return NextResponse.json({ error: "Company is required" }, { status: 400 });

    const password = body.password || generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        companyId,
        roleId: body.roleId || undefined,
        name: body.name,
        email: body.email,
        passwordHash,
        isSuperAdmin: body.isSuperAdmin === true && session.slug === "super-admin"
      },
      include: { role: true, company: true }
    });

    await prisma.activityLog.create({
      data: {
        companyId,
        action: "Created user",
        entity: "User",
        entityId: user.id,
        metadata: { email: user.email, role: user.role?.slug }
      }
    });

    return NextResponse.json({ user, generatedPassword: password }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create user" }, { status: 500 });
  }
}
