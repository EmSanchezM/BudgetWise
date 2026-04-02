import { $, component$, type Signal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ThemeToggle } from "./theme-toggle";

export interface TopNavUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface TopNavProps {
  user: TopNavUser;
  isSidebarOpen: Signal<boolean>;
}

export const TopNav = component$<TopNavProps>(({ user, isSidebarOpen }) => {
  const toggleSidebar = $(() => {
    isSidebarOpen.value = !isSidebarOpen.value;
  });

  return (
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick$={toggleSidebar}
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/management/dashboard" class="flex ms-2 md:me-24">
              <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                BudgetWise
              </span>
            </Link>
          </div>
          <div class="flex items-center gap-3">
            <ThemeToggle />
            <div class="flex items-center ms-3 gap-3">
              <span class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
              <div class="hidden sm:block text-sm">
                <p class="text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p class="font-medium text-gray-500 truncate dark:text-gray-300">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});
