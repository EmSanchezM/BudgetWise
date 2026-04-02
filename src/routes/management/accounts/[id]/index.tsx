import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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
      currency: true,
    }
  })

  if (!account) return fail(404, { message: 'Account not found' });

  return account;
})

export const useUpdateAccount = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.account.update({
    where: { id, userId: user.id },
    data: {
      name: data.name as string,
      numberAccount: data.numberAccount as string,
      type: data.type as string,
      currency: data.currency as string,
      balance: Number(data.balance),
    },
  });

  return { success: true };
});

export default component$(() => {
  const account = useAccount();
  const action = useUpdateAccount();

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

      <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Update Account</h2>
      <Form action={action} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              type="text"
              id="name"
              name="name"
              value={account.value.name ?? action.formData?.get('name')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="numberAccount" class="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
          <div class="mt-2">
            <input
              type="text"
              id="numberAccount"
              name="numberAccount"
              value={account.value.numberAccount ?? action.formData?.get('numberAccount')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
          <div class="mt-2">
            <input
              type="text"
              id="type"
              name="type"
              value={account.value.type ?? action.formData?.get('type')}
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
              value={account.value.currency ?? action.formData?.get('currency')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="balance" class="block text-sm font-medium leading-6 text-gray-900">Balance</label>
          <div class="mt-2">
            <input
              type="number"
              id="balance"
              name="balance"
              value={fromCents(account.value.balance as number) ?? action.formData?.get('balance')}
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
  title: "BudgetWise | Detail account",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};