import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useBudget = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const budget = await orm.budget.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true,
      initDate: true,
      finishDate: true,
      amount: true,
      currency: true,
      category: {
        select: {
          name: true,
          color: true,
        }
      }
    }
  });

  if (!budget) return fail(404, { message: 'Budget not found' });

  return budget;
})

export default component$(() => {
  const budget = useBudget();

  return (
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Budget Detail</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Name</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{budget.value.name}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{new Date(String(budget.value.initDate)).toLocaleDateString()}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">End Date</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{new Date(String(budget.value.finishDate)).toLocaleDateString()}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Amount</span>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{fromCents(budget.value.amount as number)}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Currency</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{budget.value.currency}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Category</span>
          <div class="flex items-center gap-2 mt-1">
            <span class="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: budget.value.category?.color as string }}></span>
            <p class="text-lg font-medium text-gray-900 dark:text-white">{budget.value.category?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
});

export const head: DocumentHead = {
  title: "BudgetWise App | Detail budget",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};