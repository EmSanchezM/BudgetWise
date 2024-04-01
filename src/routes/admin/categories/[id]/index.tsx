import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  return (
    <>
      <h1>Update or detail category</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise App | Detail category",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};