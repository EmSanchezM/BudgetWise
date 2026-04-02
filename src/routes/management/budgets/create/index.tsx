import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, routeLoader$, zod$, Form, Link } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/ui";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateBudgetSchemaValidation } from "~/lib/validation-schemes";

export const useCategories = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  return orm.category.findMany({
    where: { userId: user.id, deletedAt: null },
    select: { id: true, name: true },
  });
});

export const useCreateBudget = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = getAuthenticatedUser(sharedMap);

  const budget = await orm.budget.create({
    data: {
      userId: user.id,
      name: data.name,
      initDate: new Date(data.initDate),
      finishDate: new Date(data.finishDate),
      amount: data.amount,
      currency: data.currency,
      categoryId: data.category,
    },
    select: { id: true }
  });

  if (!budget.id) return fail(500, { message: 'Error create budget' });

  throw redirect(302, MANAGEMENT_ROUTES.BUDGETS);
}, zod$(CreateBudgetSchemaValidation));

export default component$(() => {
  const categories = useCategories();
  const action = useCreateBudget();

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.BUDGETS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to budgets
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">Set New Budget</h1>
        <p class="text-on-surface-variant text-sm leading-relaxed">Define your spending limits and take control.</p>
      </div>

      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <FormGroup type="text" label="Name" id="name" name="name" placeholder="e.g. Monthly Groceries" errors={action.value?.fieldErrors?.name} />
          <FormGroup type="select" label="Category" id="category" name="category" items={categories.value} errors={action.value?.fieldErrors?.category} />
          <FormGroup type="select" label="Currency" id="currency" name="currency" items={currencies.map(c => ({ id: c.value, name: c.label }))} errors={action.value?.fieldErrors?.currency} />
          <FormGroup type="number" label="Amount" id="amount" name="amount" placeholder="0" errors={action.value?.fieldErrors?.amount} />
          <div class="grid grid-cols-2 gap-4">
            <FormGroup type="date" label="Start Date" id="initDate" name="initDate" errors={action.value?.fieldErrors?.initDate} />
            <FormGroup type="date" label="End Date" id="finishDate" name="finishDate" errors={action.value?.fieldErrors?.finishDate} />
          </div>

          <button type="submit" disabled={action.isRunning} class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {action.isRunning ? 'Creating...' : 'Create Budget'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Create Budget",
  meta: [{ name: "description", content: "Create a new budget" }],
};
