import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import orm from "~/lib/orm";

export const useBudgets = routeLoader$(async () => {
  const budgets = await orm.budget.findMany({
    select: {
      id: true,
      name: true,
      amount: true,
      currency: true,
      initDate: true,
      finishDate: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  return budgets;
});

export default component$(() => {
  const budgets = useBudgets();

  return (
    <>
      <h1>Budgets</h1>
      {
        JSON.stringify(budgets.value, null, 2)
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise App | Budgets",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};