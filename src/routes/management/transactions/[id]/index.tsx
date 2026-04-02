import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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

export const useUpdateTransaction = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.transaction.update({
    where: { id, userId: +user.id },
    data: {
      name: data.name as string,
      transactionDate: new Date(data.transactionDate as string),
      amount: Number(data.amount),
      currency: data.currency as string,
      description: data.description as string,
    },
  });

  return { success: true };
});

export default component$(() => {
  const transaction = useTransaction();
  const action = useUpdateTransaction();

  const formatDateForInput = (date: unknown) => {
    const d = new Date(String(date));
    return d.toISOString().split('T')[0];
  };

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

      <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Update Transaction</h2>
      <Form action={action} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              type="text"
              id="name"
              name="name"
              value={transaction.value.name ?? action.formData?.get('name')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="transactionDate" class="block text-sm font-medium leading-6 text-gray-900">Transaction Date</label>
          <div class="mt-2">
            <input
              type="date"
              id="transactionDate"
              name="transactionDate"
              value={formatDateForInput(transaction.value.transactionDate) ?? action.formData?.get('transactionDate')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div class="mt-2">
            <input
              type="number"
              id="amount"
              name="amount"
              value={fromCents(transaction.value.amount as number) ?? action.formData?.get('amount')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="currency" class="block text-sm font-medium leading-6 text-gray-900">Currency</label>
          <div class="mt-2">
            <input
              type="text"
              id="currency"
              name="currency"
              value={transaction.value.currency ?? action.formData?.get('currency')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <input
              type="text"
              id="description"
              name="description"
              value={transaction.value.description ?? action.formData?.get('description')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
        </div>
      </Form>
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