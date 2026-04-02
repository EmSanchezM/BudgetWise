import { component$ } from "@builder.io/qwik";
import { useLocation, Form, type ActionStore } from "@builder.io/qwik-city";
import { MANAGEMENT_ROUTES } from "~/lib/constants";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const mainNavItems: NavItem[] = [
  { href: MANAGEMENT_ROUTES.DASHBOARD, label: "Dashboard", icon: "dashboard" },
  { href: MANAGEMENT_ROUTES.ACCOUNTS, label: "Accounts", icon: "account_balance" },
  { href: MANAGEMENT_ROUTES.CATEGORIES, label: "Categories", icon: "grid_view" },
  { href: MANAGEMENT_ROUTES.BUDGETS, label: "Budgets", icon: "account_balance_wallet" },
  { href: MANAGEMENT_ROUTES.TRANSACTIONS, label: "Transactions", icon: "receipt_long" },
];

const bottomNavItems: NavItem[] = [
  { href: "/management/profile", label: "Profile", icon: "person" },
  { href: "/management/settings", label: "Settings", icon: "settings" },
];

export interface DesktopSidebarProps {
  logoutAction: ActionStore<Record<string, never>, Record<string, never>>;
}

export const DesktopSidebar = component$<DesktopSidebarProps>(({ logoutAction }) => {
  const location = useLocation();

  const renderNavItem = (item: NavItem) => {
    const isActive = location.url.pathname.startsWith(item.href);

    return (
      <a
        key={item.href}
        href={item.href}
        class={[
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
          isActive
            ? "bg-white text-slate-900 font-bold shadow-sm"
            : "text-slate-500 hover:bg-slate-200",
        ].join(" ")}
      >
        <span
          class="material-symbols-outlined"
          style={isActive ? "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : undefined}
        >
          {item.icon}
        </span>
        <span class="text-[11px] uppercase tracking-wide">{item.label}</span>
      </a>
    );
  };

  return (
    <aside class="h-screen w-64 fixed left-0 top-0 z-50 bg-slate-100 hidden lg:flex flex-col p-6 border-r border-slate-200/10">
      {/* Logo */}
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-1">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span
              class="material-symbols-outlined text-white text-sm"
              style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            >
              account_balance_wallet
            </span>
          </div>
          <h1 class="font-black tracking-tighter text-slate-900 text-xl">The Curator</h1>
        </div>
        <p class="text-[11px] tracking-wide uppercase text-slate-500">Editorial Intelligence</p>
      </div>

      {/* Main nav */}
      <nav class="flex-1 flex flex-col gap-1">
        {mainNavItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Bottom nav */}
      <div class="mt-auto flex flex-col gap-1 pt-6 border-t border-slate-200/20">
        {bottomNavItems.map((item) => renderNavItem(item))}
        <Form action={logoutAction}>
          <button
            type="submit"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 hover:bg-slate-200 w-full"
          >
            <span class="material-symbols-outlined">logout</span>
            <span class="text-[11px] uppercase tracking-wide">Logout</span>
          </button>
        </Form>
      </div>
    </aside>
  );
});
