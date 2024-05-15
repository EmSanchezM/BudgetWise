import { QRL, Slot, component$, useContext } from "@builder.io/qwik";
import { HeaderContext } from "../home";
import { Link } from "@builder.io/qwik-city";

interface LinkProps {
  href: string;
  isMobile?: boolean;
  onClick: QRL<(nameRoute: string) => string>
}

export const ButtonLink = component$(({ href, isMobile = false, onClick }: LinkProps) => {

  const activeLink = useContext(HeaderContext)

  const routeWithCharacters = href.match(/[a-zA-Z0-9_]+$/);
  const nameRoute = routeWithCharacters !== null ? routeWithCharacters[0] : '';

  const isActiveRoute = activeLink.value === nameRoute;

  const classResponsive = isMobile ?
    `mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent ${isActiveRoute ? "border-orange-500 text-orange-500 " : "border-transparent"}` :
    `px-4 py-2 mx-4 cursor-pointer animation-hover inline-block relative ${isActiveRoute ? "text-orange-500 " : "text-neutral-900 hover:text-orange-500"}`;

  return (
    <Link
      href={href}
      onClick$={() => onClick(nameRoute)}
      class={classResponsive}
    >
      <Slot />
    </Link>
  )
});