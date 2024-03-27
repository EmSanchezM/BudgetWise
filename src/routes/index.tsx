import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="container flex items-center p-4 mx-auto min-h-screen justify-center bg-blue-500">
      <h1 class="text-center">Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </main>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise App",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
