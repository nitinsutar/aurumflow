import { BarChart3, Boxes, ClipboardList, LayoutDashboard, PackageCheck, QrCode, RotateCcw, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RoleSlug } from "@/lib/types";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: RoleSlug[];
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["company-admin", "inventory-manager", "billing-manager"] },
  { href: "/sku-variants", label: "SKU Variants", icon: QrCode, roles: ["company-admin", "inventory-manager"] },
  { href: "/inventory", label: "Inventory", icon: Boxes, roles: ["company-admin", "inventory-manager"] },
  { href: "/components-bom", label: "Components & BOM", icon: PackageCheck, roles: ["company-admin", "inventory-manager"] },
  { href: "/returns", label: "Returns", icon: RotateCcw, roles: ["company-admin", "inventory-manager", "billing-manager"] },
  { href: "/insights", label: "Insights", icon: BarChart3, roles: ["company-admin", "inventory-manager"] },
  { href: "/ledger", label: "Stock Ledger", icon: ClipboardList, roles: ["company-admin", "inventory-manager", "billing-manager"] },
  { href: "/users", label: "Users & Roles", icon: Users, roles: ["company-admin", "super-admin"] },
  { href: "/super-admin", label: "Super Admin", icon: Shield, roles: ["super-admin"] }
];

export function visibleNav(role: RoleSlug) {
  return navItems.filter((item) => item.roles.includes(role));
}
