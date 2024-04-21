import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, routeLoader$, zod$, Form } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { CreateBudgetSchemaValidation } from "~/lib/validation-schemes";

export const useCategories = routeLoader$(async () => {
  const categories = await orm.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return categories;
});

export const useCreateBudget = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };

  const payload = {
    userId: +user.id,
    name: data.name,
    initDate: data.initDate,
    finishDate: data.finishDate,
    amount: data.amount,
    currency: data.currency,
  }

  const budget = await orm.budget.create({
    data: payload,
    select: { id: true }
  });

  if (!budget.id) fail(500, { message: 'Error create budget' });

  redirect(301, '/admin/budgets');
}, zod$(CreateBudgetSchemaValidation));

export default component$(() => {
  const categories = useCategories();
  const action = useCreateBudget();

  return (
    <>
      <Form action={action} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">Monto</label>
          <div class="mt-2">
            <input id="amount" name="amount" type="number" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="currency" class="block text-sm font-medium leading-6 text-gray-900">Moneda</label>
          <div class="mt-2">
            <input id="currency" name="currency" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="initDate" class="block text-sm font-medium leading-6 text-gray-900">Fecha de inicio</label>
          <div class="mt-2">
            <input id="initDate" name="initDate" type="date" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="finishDate" class="block text-sm font-medium leading-6 text-gray-900">Fecha de finalización</label>
          <div class="mt-2">
            <input id="finishDate" name="finishDate" type="date" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
        </div>
      </Form>
    </>
  )
})

export const head: DocumentHead = {
  title: "BudgetWise App | Create budget",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};