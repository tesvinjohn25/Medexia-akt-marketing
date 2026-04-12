"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/generate", label: "Generate", icon: "⚡" },
  { href: "/dashboard/review", label: "Review", icon: "👁" },
  { href: "/dashboard/schedule", label: "Schedule", icon: "📅" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "📊" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--bg-ink)" }}>
      {/* Sidebar — hidden on mobile */}
      <aside
        className="hidden md:flex w-56 shrink-0 border-r flex-col"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="p-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h1
            className="text-lg font-semibold"
            style={{ color: "var(--fg-high)" }}
          >
            Medexia
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
            Content Command Center
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: active ? "var(--bg-elevated)" : "transparent",
                  color: active ? "var(--fg-high)" : "var(--fg-mid)",
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">{children}</div>
      </main>

      {/* Bottom tab bar — mobile only */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-center transition-colors"
              style={{
                color: active ? "var(--fg-high)" : "var(--fg-muted)",
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
