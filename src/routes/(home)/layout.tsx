import { Slot, component$ } from "@builder.io/qwik";
import { Footer, Header } from "~/components/home";

export default component$(() => {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
});
