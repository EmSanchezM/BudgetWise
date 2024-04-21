import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { CreateAccountSchemaValidation } from "~/lib/validation-schemes";

export const useCreateAccount = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };

  const payload = {
    userId: +user.id,
    name: data.name,
    numberAccount: data.numberAccount,
    type: data.type,
    balance: data.balance,
  }

  const account = await orm.account.create({
    data: payload,
    select: { id: true }
  });

  if (!account.id) fail(500, { message: 'Error create account' });

  redirect(301, '/admin/accounts');
}, zod$(CreateAccountSchemaValidation));

export default component$(() => {
  const action = useCreateAccount();

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
          <label for="numberAccount" class="block text-sm font-medium leading-6 text-gray-900">Number account</label>
          <div class="mt-2">
            <input id="numberAccount" name="numberAccount" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
          <div class="mt-2">
            <input id="type" name="type" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="balance" class="block text-sm font-medium leading-6 text-gray-900">Balance</label>
          <div class="mt-2">
            <input id="balance" name="balance" type="number" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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