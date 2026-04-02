import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";

export const useAccount = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = sharedMap.get("user") as UserAuth;

  const account = await orm.account.findUnique({
    where: { id, userId: user.id },
    select: {
      name: true,
      numberAccount: true,
      type: true,
      balance: true,
    }
  })

  if (!account) return fail(404, { message: 'Account not found' });

  return account;
})

export default component$(() => {
  const account = useAccount();

  return (
    <>
      <h1>Account detail</h1>
      <hr />
      {
        JSON.stringify(account.value, null, 2)
      }
    </>
  )
});

export const head: DocumentHead = {
  title: "BudgetWise | Detail account",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};