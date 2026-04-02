import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useTransaction = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const transaction = await orm.transaction.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true,
      transactionDate: true,
      amount: true,
      currency: true,
      description: true,
      isExpense: true,
      account: {
        select: {
          name: true,
          numberAccount: true,
          type: true,
        }
      },
    }
  });

  if (!transaction) return fail(404, { message: 'Transaction not found' });

  return transaction;
});

export default component$(() => {
  const transaction = useTransaction();

  return (
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transaction Detail</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Name</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{transaction.value.name}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Date</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{new Date(String(transaction.value.transactionDate)).toLocaleDateString()}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Amount</span>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{fromCents(transaction.value.amount as number)}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Currency</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{transaction.value.currency}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Description</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{transaction.value.description}</p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Type</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">
            <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.value.isExpense ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {transaction.value.isExpense ? 'Expense' : 'Income'}
            </span>
          </p>
        </div>
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Account</span>
          <p class="text-lg font-medium text-gray-900 dark:text-white">{transaction.value.account?.name}</p>
        </div>
      </div>
    </div>
  )
});

export const head: DocumentHead = {
  title: "BudgetWise | Detail transaction",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};