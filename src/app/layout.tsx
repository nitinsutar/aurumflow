import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AurumFlow SaaS",
  description: "Inventory and production management for jewellery manufacturers"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
