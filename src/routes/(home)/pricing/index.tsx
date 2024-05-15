import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Pricing } from "~/components/home";

export default component$(() => {
  return <Pricing />;
});

export const head: DocumentHead = {
  title: "BudgetWise | Pricing",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
