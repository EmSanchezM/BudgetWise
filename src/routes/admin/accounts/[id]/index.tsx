import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import orm from "~/lib/orm";

const useAccount = routeLoader$(async ({ params, fail }) => {
  const accountID = +params.id;

  const account = await orm.account.findUnique({
    where: { id: accountID },
    select: {
      name: true,
      numberAccount: true,
      type: true,
      balance: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      }
    }
  })

  if (!account) fail(404, { message: 'Account not found' });

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