import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import orm from "~/lib/orm";

export const useTransactions = routeLoader$(async () => {
  const transactions = await orm.transaction.findMany({
    select: {
      id: true,
      name: true,
      amount: true,
      currency: true,
      transactionDate: true,
      description: true,
      isExpense: true,
      account: {
        select: {
          name: true,
        }
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  return transactions;
});

export default component$(() => {
  const transactions = useTransactions();

  return (
    <>
      <h1>Transactions</h1>
      {
        JSON.stringify(transactions.value, null, 2)
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Accounts",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};