import { NavLink, Outlet } from "react-router";
import { Home, Building2, Wallet, Settings } from "lucide-react";
import { cn } from "~/lib/utils";

const navItems = [
  { to: "/mobile", label: "홈", icon: Home },
  { to: "/mobile/realestate", label: "부동산", icon: Building2 },
  { to: "/mobile/assets", label: "자산", icon: Wallet },
  { to: "/mobile/settings", label: "설정", icon: Settings },
];

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="px-4 py-4">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-around">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/mobile"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 text-xs transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )
              }
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
