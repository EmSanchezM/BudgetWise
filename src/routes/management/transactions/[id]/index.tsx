import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useTransaction = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const transaction = await orm.transaction.findUnique({
    where: { id, userId: user.id, deletedAt: null },
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
        JSON.stringify({ ...transaction.value, amount: fromCents(transaction.value.amount as number) }, null, 2)
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