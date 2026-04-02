import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
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

export default component$(() => {
  const budget = useBudget();

  return (
    <>
      <h1>Budget detail</h1>
      <hr />
      {
        JSON.stringify({ ...budget.value, amount: fromCents(budget.value.amount as number) }, null, 2)
      }
    </>
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