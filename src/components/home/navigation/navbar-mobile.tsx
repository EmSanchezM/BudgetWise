import { $, QRL, component$ } from "@builder.io/qwik";
import { ButtonLink } from "~/components/shared";
import { InfoIcon, MoneyIcon, WorldIcon } from "~/components/shared/icons";

interface NavbarMobileProps {
  handleActiveRoute: QRL<(nameRoute: string) => string>
}

export const NavbarMobile = component$(({ handleActiveRoute }: NavbarMobileProps) => {

  return (
    <nav class="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-transparent">
      <div class="bg-white-500 sm:px-3">
        <ul class="flex w-full justify-between items-center text-black">
          <ButtonLink href="/" isMobile onClick={handleActiveRoute}>
            <InfoIcon />
            About
          </ButtonLink>
          <ButtonLink href="/feature" isMobile onClick={handleActiveRoute} >
            <WorldIcon />
            Feature
          </ButtonLink>
          <ButtonLink href="/pricing" isMobile onClick={handleActiveRoute}>
            <MoneyIcon />
            Pricing
          </ButtonLink>
        </ul>
      </div>
    </nav>
  )
})