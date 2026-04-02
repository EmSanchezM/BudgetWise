import { Slot, component$ } from "@builder.io/qwik";

import { Footer, Header } from "~/components/home";

export default component$(() => {
  return (
    <div class="min-h-screen bg-surface">
      <Header />
      <main class="pt-24 pb-12">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
