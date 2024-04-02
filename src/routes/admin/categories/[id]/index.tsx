import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, routeAction$, Form } from "@builder.io/qwik-city";

import orm from "~/lib/orm";

export const useCategory = routeLoader$(async ({ params, fail }) => {
  const { id } = params;

  const category = await orm.category.findUnique({ where: { id: +id }, select: { id: true, name: true, description: true, color: true } });

  if (!category) return fail(404, { message: 'Category not found' });

  return category;
});

export const useUpdateCategory = routeAction$(async (data, { params, redirect, fail }) => {
  const { id } = params;

  if (!id) return fail(404, { message: 'Category not found' });

  const category = await orm.category.update({ data, where: { id: +id }, select: { id: true } });

  if (!category.id) return fail(500, { message: 'Fail updated category' });

  redirect(301, '/admin/categories');
})

export default component$(() => {
  const category = useCategory();
  const action = useUpdateCategory();

  if (category.value.message) return (<p>{category.value?.message}</p>)

  return (
    <Form action={action} class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input
            type="text"
            id="name"
            name="name"
            value={category.value?.name ?? action.formData?.get('name')}
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
            value={category.value?.description ?? action.formData?.get('description')}
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label for="color" class="block text-sm font-medium leading-6 text-gray-900">Color</label>
        <div class="mt-2">
          <input
            type="text"
            id="color"
            name="color"
            value={category.value?.color ?? action.formData?.get('color')}
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
      </div>
    </Form>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise App | Detail category",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};