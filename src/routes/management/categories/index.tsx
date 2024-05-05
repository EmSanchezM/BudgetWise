import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";

export const useCategories = routeLoader$(async ({ sharedMap }) => {
  const user = sharedMap.get('user') as UserAuth;

  const categories = await orm.category.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      name: true,
      description: true,
      color: true,
    }
  });

  return categories;
});

export default component$(() => {
  const categories = useCategories();

  return (
    <>
      <h1>Categories</h1>
      {
        JSON.stringify(categories.value, null, 2)
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Categories",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};