import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";

export const Header = component$(() => {
  return (
    <header class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <Link href="/" class="text-2xl font-black tracking-tighter text-primary">
        BudgetWise
      </Link>
      <div class="flex items-center gap-4">
        <Link
          href={PUBLIC_ROUTES.SIGN_IN}
          class="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          Sign in
        </Link>
        <Link
          href={PUBLIC_ROUTES.SIGN_UP}
          class="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-transform"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
});
