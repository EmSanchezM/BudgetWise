import { component$, type Signal } from "@builder.io/qwik";
import { type ActionStore } from "@builder.io/qwik-city";
import { NavItem } from "./nav-item";

export interface SidebarProps {
  logoutAction: ActionStore<Record<string, never>, Record<string, never>>;
  isOpen: Signal<boolean>;
}

export const Sidebar = component$<SidebarProps>(({ logoutAction, isOpen }) => {
  return (
    <aside
      id="logo-sidebar"
      class={[
        "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700",
        isOpen.value ? "translate-x-0" : "-translate-x-full",
      ]}
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <NavItem
            href="/management/dashboard"
            label="Dashboard"
            icon="dashboard"
          />
          <NavItem
            href="/management/accounts"
            label="Accounts"
            icon="accounts"
          />
          <NavItem
            href="/management/categories"
            label="Categories"
            icon="categories"
          />
          <NavItem
            href="/management/budgets"
            label="Budgets"
            icon="budgets"
          />
          <NavItem
            href="/management/transactions"
            label="Transactions"
            icon="transactions"
          />
          <NavItem
            href="#"
            label="Logout"
            icon="logout"
            logoutAction={logoutAction}
          />
        </ul>
      </div>
    </aside>
  );
});
