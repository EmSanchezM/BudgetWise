import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Feature } from "~/components/home";

export default component$(() => {
  return <Feature />;
});

export const head: DocumentHead = {
  title: "BudgetWise | Feature",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
