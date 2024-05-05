import { $, Signal, component$, createContextId, useContextProvider, useSignal } from "@builder.io/qwik";

import { NavbarMobile } from "./navbar-mobile";
import { NavbarDesktop } from "./navbar-desktop";

export const HeaderContext = createContextId<Signal<string>>('header.active-link-context');

export const Header = component$(() => {
  const activeLink = useSignal('')
  useContextProvider(HeaderContext, activeLink);

  const handleActiveRoute = $((nameRoute: string) => activeLink.value = nameRoute);

  return (
    <>
      <header class="fixed top-0 w-full z-30 bg-white-500 transition-all">
        <NavbarDesktop handleActiveRoute={handleActiveRoute} />
      </header>
      <NavbarMobile handleActiveRoute={handleActiveRoute} />
    </>
  )
})