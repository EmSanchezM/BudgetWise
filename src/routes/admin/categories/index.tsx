import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import orm from "~/lib/orm";

export const useCategories = routeLoader$(async () => {
  const categories = await orm.category.findMany({
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
  title: "BudgetWise App | Categories",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};