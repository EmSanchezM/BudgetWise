import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { About, Feature, Pricing } from "~/components/home";

export default component$(() => {
  return (
    <>
      <About />
      <Feature />
      <Pricing />
    </>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
