import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";

export const useBudget = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = sharedMap.get("user") as UserAuth;

  const budget = await orm.budget.findUnique({
    where: { id, userId: user.id },
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
        JSON.stringify(budget.value, null, 2)
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