import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import orm from "~/lib/orm";

const useTransaction = routeLoader$(async ({ params }) => {
  const transactionID = +params.id

  const transaction = orm.transaction.findUnique({
    where: { id: transactionID },
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