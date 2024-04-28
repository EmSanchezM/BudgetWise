import { $, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { JSX } from "@builder.io/qwik/jsx-runtime";
import { ArrowDownIcon, ArrowUpIcon, UserProfileIcon } from "./icons";

interface DropdownProps {
  title: string;
  style: string;
  size?: 'sm' | 'md' | 'lg';
  options: { href: string; title: string; icon: JSX.Element }[];
}

export const Dropdown = component$(({ title, size = 'sm', style, options }: DropdownProps) => {
  const isOpen = useSignal(false);

  const toogleDropdown = $(() => isOpen.value = !isOpen.value);

  const sizes = {
    sm: 'py-2 px-5 sm:px-8',
    md: 'py-3 px-12 lg:py-4 lg:px-16',
    lg: 'py-3 px-12 lg:py-4 lg:px-16',
  }

  const defaultStyle = `${sizes[size]} flex items-center justify-between w-full mx-1`;

  return (
    <div class="relative flex flex-col items-center rounded">
      <button
        onClick$={toogleDropdown}
        class={`${defaultStyle} ${style}`}
      >
        {title}
        {
          isOpen.value ? <ArrowDownIcon /> : <ArrowUpIcon />
        }
      </button>
      {
        isOpen.value && (
          <div class="absolute top-16 flex flex-col items-start rounded-lg p-2 w-full">
            {
              options.length > 0 && options.map(option => {
                return (
                  <Link key={option.title} href={option.href} class="p-4 flex w-full justify-between cursor-pointer rounded-r-lg border-l-4 border-l-transparent hover:border-l-orange-400">
                    <h3 class="font-bold">{option.title}</h3>
                    <span>
                      {option.icon}
                    </span>
                  </Link>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
})