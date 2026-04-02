import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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
      categoryId: true,
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

export const useUpdateBudget = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.budget.update({
    where: { id, userId: user.id },
    data: {
      name: data.name as string,
      initDate: new Date(data.initDate as string),
      finishDate: new Date(data.finishDate as string),
      amount: Number(data.amount),
      currency: data.currency as string,
    },
  });

  return { success: true };
});

export default component$(() => {
  const budget = useBudget();
  const action = useUpdateBudget();

  const formatDateForInput = (date: unknown) => {
    const d = new Date(String(date));
    return d.toISOString().split('T')[0];
  };

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

      <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Update Budget</h2>
      <Form action={action} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              type="text"
              id="name"
              name="name"
              value={budget.value.name ?? action.formData?.get('name')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="initDate" class="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
          <div class="mt-2">
            <input
              type="date"
              id="initDate"
              name="initDate"
              value={formatDateForInput(budget.value.initDate) ?? action.formData?.get('initDate')}
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="finishDate" class="block text-sm font-medium leading-6 text-gray-900">End Date</label>
          <div class="mt-2">
            <input
              type="date"
              id="finishDate"
              name="finishDate"
              value={formatDateForInput(budget.value.finishDate) ?? action.formData?.get('finishDate')}
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
              value={fromCents(budget.value.amount as number) ?? action.formData?.get('amount')}
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
              value={budget.value.currency ?? action.formData?.get('currency')}
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
  title: "BudgetWise App | Detail budget",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};