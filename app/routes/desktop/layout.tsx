import { NavLink, Outlet } from "react-router";
import { Home, Building2, Wallet, Settings } from "lucide-react";
import { cn } from "~/lib/utils";

const navItems = [
  { to: "/desktop", label: "홈", icon: Home },
  { to: "/desktop/realestate", label: "부동산", icon: Building2 },
  { to: "/desktop/assets", label: "자산", icon: Wallet },
  { to: "/desktop/settings", label: "설정", icon: Settings },
];

export default function DesktopLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
          <NavLink to="/desktop" className="mr-8 text-lg font-bold">
            Folio
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/desktop"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
