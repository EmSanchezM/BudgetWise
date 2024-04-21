import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import orm from "~/lib/orm";

export const useUsers = routeLoader$(async () => {
  const users = await orm.user.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      password: true
    }
  });

  return users;
});

export default component$(() => {
  const users = useUsers();
  return (
    <>
      <h1>Admin</h1>
      {
        JSON.stringify(users.value, null, 2)
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Dashboard",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
