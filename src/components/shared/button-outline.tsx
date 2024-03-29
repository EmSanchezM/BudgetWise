import { component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

interface ButtonOutlineProps {
  href: string;
}

export const ButtonOutline = component$(({ href }: ButtonOutlineProps) => {
  const navigate = useNavigate();
  return (
    <button onClick$={() => navigate(href)} class="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white transition-all hover:shadow-orange">
      {" "}
      <Slot />
    </button>
  )
})