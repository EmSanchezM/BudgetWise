import { QRL, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ButtonLink, ButtonOutline } from "~/components/shared";
import { PUBLIC_ROUTES } from "~/lib/constants";

export interface NavbarDesktopProps {
  handleActiveRoute: QRL<(nameRoute: string) => string>
}

export const NavbarDesktop = component$<NavbarDesktopProps>(({ handleActiveRoute }) => {

  return (
    <nav class="max-w-screen px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
      <div class="col-start-1 cold-end-2 flex items-center">
        <Link href='/'>
          <span class="h-8 w-auto">BudgetWise</span>
        </Link>
      </div>
      <ul class="hidden lg:flex col-start-4 col-end-8 text-black items-center">
        <ButtonLink href="/" onClick={handleActiveRoute}>
          About
        </ButtonLink>
        <ButtonLink href="/feature" onClick={handleActiveRoute}>
          Feature
        </ButtonLink>
        <ButtonLink href="/pricing" onClick={handleActiveRoute}>
          Pricing
        </ButtonLink>
      </ul>
      <div class="col-start-10 col-end-12 font-medium flex justify-end items-center">
        <Link href={PUBLIC_ROUTES.SIGN_IN} class="text-black mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">Sign in</Link>
        <ButtonOutline href={PUBLIC_ROUTES.SIGN_UP}>Sign up</ButtonOutline>
      </div>
    </nav>
  );
});