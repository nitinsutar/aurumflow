import { BarChart3, Bell, Boxes, Building2, Calculator, ClipboardList, Factory, Gem, LayoutDashboard, Lock, PackageCheck, QrCode, RotateCcw, Settings, Shield, ShoppingBag, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RoleSlug } from "@/lib/types";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: RoleSlug[];
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["owner", "inventory", "production", "auditor"] },
  { href: "/sku-variants", label: "SKU Variants", icon: QrCode, roles: ["owner", "inventory", "sales", "production", "auditor"] },
  { href: "/inventory", label: "Raw Inventory", icon: Boxes, roles: ["owner", "inventory"] },
  { href: "/components-bom", label: "Components & BOM", icon: PackageCheck, roles: ["owner", "inventory", "production"] },
  { href: "/returns", label: "Returns", icon: RotateCcw, roles: ["owner", "inventory", "sales"] },
  { href: "/insights", label: "Insights", icon: BarChart3, roles: ["owner", "inventory", "sales", "auditor"] },
  { href: "/ledger", label: "Ledger", icon: ClipboardList, roles: ["owner", "inventory", "accountant"] },
  { href: "/metal-rates", label: "Metal Rates", icon: Gem, roles: ["owner", "inventory", "accountant"] },
  { href: "/designs", label: "Design Master", icon: Sparkles, roles: ["owner", "production"] },
  { href: "/orders", label: "Orders", icon: ShoppingBag, roles: ["owner", "sales", "production"] },
  { href: "/job-cards", label: "Job Cards", icon: Factory, roles: ["owner", "production", "karigar"] },
  { href: "/material-movement", label: "Issue & Return", icon: PackageCheck, roles: ["owner", "production", "inventory", "karigar"] },
  { href: "/finished-goods", label: "Finished Goods", icon: QrCode, roles: ["owner", "sales", "production"] },
  { href: "/barcode-labels", label: "Barcode Labels", icon: QrCode, roles: ["owner", "inventory", "production", "sales"] },
  { href: "/pricing", label: "Pricing", icon: Calculator, roles: ["owner", "sales", "accountant"] },
  { href: "/customers", label: "Customers", icon: Users, roles: ["owner", "sales"] },
  { href: "/vendors", label: "Vendors", icon: Building2, roles: ["owner", "inventory", "accountant"] },
  { href: "/reports", label: "Reports", icon: BarChart3, roles: ["owner", "inventory", "production", "accountant", "auditor"] },
  { href: "/alerts", label: "Alerts", icon: Bell, roles: ["owner", "inventory", "production", "auditor"] },
  { href: "/assistant", label: "AI Assistant", icon: Sparkles, roles: ["owner", "inventory", "production", "sales"] },
  { href: "/audit", label: "Audit", icon: Lock, roles: ["owner", "accountant", "auditor"] },
  { href: "/settings", label: "Settings", icon: Settings, roles: ["owner"] },
  { href: "/users", label: "Users & Roles", icon: Users, roles: ["owner", "super-admin"] },
  { href: "/super-admin", label: "Super Admin", icon: Shield, roles: ["super-admin"] }
];

export function visibleNav(role: RoleSlug) {
  return navItems.filter((item) => item.roles.includes(role));
}
