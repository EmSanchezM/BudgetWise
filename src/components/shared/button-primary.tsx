import { Slot, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

interface ButtonPrimaryProps {
  href: string;
  addClass?: string;
}

export const ButtonPrimary = component$(({ href, addClass }: ButtonPrimaryProps) => {
  const navigate = useNavigate();

  return (
    <button onClick$={() => navigate(href)} class={`py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-md transition-all outline-none ${addClass}`}>
      <Slot />
    </button>
  )
})