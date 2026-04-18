import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, routeAction$, Form, Link } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { MANAGEMENT_ROUTES } from "~/lib/constants";

import orm from "~/lib/orm";

export const useCategory = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const category = await orm.category.findUnique({ where: { id, userId: user.id, deletedAt: null }, select: { id: true, name: true, description: true, color: true } });

  if (!category) return fail(404, { message: 'Category not found' });

  return category;
});

export const useUpdateCategory = routeAction$(async (data, { params, redirect, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const category = await orm.category.update({ data, where: { id, userId: user.id }, select: { id: true } });

  if (!category.id) return fail(500, { message: 'Fail updated category' });

  throw redirect(302, MANAGEMENT_ROUTES.CATEGORIES);
});

export default component$(() => {
  const category = useCategory();
  const action = useUpdateCategory();

  if (category.value.message) return (<p class="text-error">{category.value?.message}</p>);

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.CATEGORIES} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to categories
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">Edit Category</h1>
      </div>

      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <div>
            <label for="name" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
            <input type="text" id="name" name="name" value={category.value?.name ?? action.formData?.get('name')} class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label for="description" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <input type="text" id="description" name="description" value={category.value?.description ?? action.formData?.get('description')} class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20" />
          </div>
          <div>
            <label for="color" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Color</label>
            <input type="text" id="color" name="color" value={category.value?.color ?? action.formData?.get('color')} class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20" />
          </div>
          <button type="submit" class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all">Update Category</button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Edit Category",
  meta: [{ name: "description", content: "Edit category details" }],
};
