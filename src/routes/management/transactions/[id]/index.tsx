import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";

export const useTransaction = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = sharedMap.get("user") as UserAuth;

  const transaction = await orm.transaction.findUnique({
    where: { id, userId: user.id },
    select: {
      name: true,
      transactionDate: true,
      amount: true,
      currency: true,
      description: true,
      isExpense: true,
      account: {
        select: {
          name: true,
          numberAccount: true,
          type: true,
        }
      },
    }
  });

  if (!transaction) return fail(404, { message: 'Transaction not found' });

  return transaction;
});

export default component$(() => {
  const transaction = useTransaction();

  return (
    <>
      <h1>Transaction detail</h1>
      <hr />
      {
        JSON.stringify(transaction.value, null, 2)
      }
    </>
  )
});

export const head: DocumentHead = {
  title: "BudgetWise | Detail transaction",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};