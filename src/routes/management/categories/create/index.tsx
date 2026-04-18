import { component$ } from "@builder.io/qwik";
import { Form, Link, type DocumentHead, routeAction$, zod$ } from "@builder.io/qwik-city";
import { FormGroup } from "~/components/ui";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";

import orm from "~/lib/orm";
import { CreateCategorySchemaValidation } from "~/lib/validation-schemes";

export const useCreateCategory = routeAction$(async (data, { redirect, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);

  const category = await orm.category.create({
    data: {
      name: data.name,
      color: data.color,
      description: data.description,
      userId: user.id
    },
    select: { id: true }
  });

  if (!category.id) fail(500, { message: 'Error create category' });

  redirect(302, MANAGEMENT_ROUTES.CATEGORIES);
}, zod$(CreateCategorySchemaValidation));

export default component$(() => {
  const action = useCreateCategory();

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.CATEGORIES} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to categories
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">Create Category</h1>
        <p class="text-on-surface-variant text-sm leading-relaxed">
          Organize your transactions and budgets with custom categories.
        </p>
      </div>

      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <FormGroup type="text" label="Name" id="name" name="name" placeholder="e.g. Food & Dining" errors={action.value?.fieldErrors?.name} />
          <FormGroup type="text" label="Description" id="description" name="description" placeholder="e.g. Restaurants, groceries, delivery" errors={action.value?.fieldErrors?.description} />
          <FormGroup type="text" label="Color" id="color" name="color" placeholder="e.g. #4A90D9" errors={action.value?.fieldErrors?.color} />

          <button
            type="submit"
            disabled={action.isRunning}
            class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {action.isRunning ? 'Creating...' : 'Create Category'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Create Category",
  meta: [{ name: "description", content: "Create a new financial category" }],
};
