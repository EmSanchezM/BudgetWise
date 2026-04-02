import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useAccount = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const account = await orm.account.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true,
      numberAccount: true,
      type: true,
      balance: true,
    }
  })

  if (!account) return fail(404, { message: 'Account not found' });

  return account;
})

export default component$(() => {
  const account = useAccount();

  return (
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Detail</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Name</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{account.value.name}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Account Number</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{account.value.numberAccount}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Type</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white capitalize">{account.value.type}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Balance</span>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{fromCents(account.value.balance as number)}</p>
        </div>
      </div>
    </div>
  )
});

export const head: DocumentHead = {
  title: "BudgetWise | Detail account",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};