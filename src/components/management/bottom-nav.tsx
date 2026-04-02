import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { MANAGEMENT_ROUTES } from "~/lib/constants";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: MANAGEMENT_ROUTES.DASHBOARD, label: "Dashboard", icon: "dashboard" },
  { href: MANAGEMENT_ROUTES.ACCOUNTS, label: "Accounts", icon: "account_balance_wallet" },
  { href: MANAGEMENT_ROUTES.CATEGORIES, label: "Categories", icon: "label" },
  { href: MANAGEMENT_ROUTES.BUDGETS, label: "Budgets", icon: "pie_chart" },
  { href: MANAGEMENT_ROUTES.TRANSACTIONS, label: "Transactions", icon: "receipt_long" },
];

export const BottomNav = component$(() => {
  const location = useLocation();

  return (
    <nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-4 bg-white/80 dark:bg-primary/80 backdrop-blur-2xl z-50 rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] lg:hidden">
      {navItems.map((item) => {
        const isActive = location.url.pathname.startsWith(item.href);

        return (
          <a
            key={item.href}
            href={item.href}
            class={[
              "flex flex-col items-center justify-center px-3 py-2 transition-all duration-300 active:scale-90",
              isActive
                ? "bg-slate-800 dark:bg-surface text-white dark:text-primary rounded-xl"
                : "text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-white",
            ].join(" ")}
          >
            <span
              class="material-symbols-outlined"
              style={isActive ? "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : undefined}
            >
              {item.icon}
            </span>
            <span class="text-[10px] font-bold uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
});
