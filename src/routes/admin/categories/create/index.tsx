import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead, routeAction$, zod$ } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { CreateCategorySchemaValidation } from "~/lib/validation-schemes";

export const useCreateCategory = routeAction$(async (data, { redirect, fail }) => {

  const category = await orm.category.create({ data, select: { id: true } });

  if (!category.id) fail(500, { message: 'Error create category' });

  redirect(301, '/admin/categories');
}, zod$(CreateCategorySchemaValidation));

export default component$(() => {
  const action = useCreateCategory();

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
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <input id="description" name="description" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="color" class="block text-sm font-medium leading-6 text-gray-900">Color</label>
          <div class="mt-2">
            <input id="color" name="color" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
        </div>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise App | Category",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};