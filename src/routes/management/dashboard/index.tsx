import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { UserAuth } from "~/lib/models";

export const useDashboard = routeLoader$(async ({ sharedMap }) => {
  const user = sharedMap.get("user") as UserAuth;
  return { user };
});

export default component$(() => {
  const data = useDashboard();

  return (
    <>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome, {data.value.user.firstName} {data.value.user.lastName}
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Dashboard coming soon.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Dashboard",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
