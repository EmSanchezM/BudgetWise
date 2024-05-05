import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { UserAuth } from "~/lib/models";

import orm from "~/lib/orm";

export const useAccounts = routeLoader$(async ({ sharedMap }) => {
  const user = sharedMap.get('user') as UserAuth;

  const accounts = await orm.account.findMany({
    where: {
      userId: +user.id
    },
    select: {
      id: true,
      name: true,
      numberAccount: true,
      balance: true,
      type: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  return accounts;
});

export default component$(() => {
  const accounts = useAccounts();

  return (
    <>
      <h1>Accounts</h1>
      {
        JSON.stringify(accounts.value, null, 2)
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