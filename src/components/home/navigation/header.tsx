import { component$, useStore } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { ButtonOutline } from "~/components/shared";

export const Header = component$(() => {
  const activeLink = useStore<{ value: string | null }>({ value: null });
  return (
    <>
      <header class="fixed top-0 w-full z-30 bg-white-500 transition-all">
        <nav class="max-w-screen px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div class="col-start-1 cold-end-2 flex items-center">
            <span class="h-8 w-auto">BudgetWise</span>
          </div>
          <ul class="hidden lg:flex col-start-4 col-end-8 text-black items-center">
            <a
              href="#about"
              onClick$={() => activeLink.value = 'about'}
              class={`px-4 py-2 mx-4 cursor-pointer animation-hover inline-block relative ${activeLink.value === 'about' ? "text-orange-500 " : "text-neutral-900 hover:text-orange-500"}`}
            >About</a>
            <a
              href="#feature"
              onClick$={() => activeLink.value = 'feature'}
              class={`px-4 py-2 mx-4 cursor-pointer animation-hover inline-block relative ${activeLink.value === 'feature' ? "text-orange-500 " : "text-neutral-900 hover:text-orange-500"}`}
            >Feature</a>
            <a
              href="#pricing"
              onClick$={() => activeLink.value = 'pricing'}
              class={`px-4 py-2 mx-4 cursor-pointer animation-hover inline-block relative ${activeLink.value === 'pricing' ? "text-orange-500 " : "text-neutral-900 hover:text-orange-500"}`}
            >Pricing</a>
          </ul>
          <div class="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <Link href="/sign-in" class="text-black mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">Sign in</Link>
            <ButtonOutline href="/sign-up">Sign up</ButtonOutline>
          </div>
        </nav>
      </header>
      <nav class="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-transparent">
        <div class="bg-white-500 sm:px-3">
          <ul class="flex w-full justify-between items-center text-black">
            <a
              href="#about"
              onClick$={() => activeLink.value = 'about'}
              class={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent ${activeLink.value === 'about' ? "border-orange-500 text-orange-500 " : "border-transparent"}`}
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </a>
            <a
              href="#feature"
              onClick$={() => activeLink.value = 'feature'}
              class={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent ${activeLink.value === 'feature' ? "border-orange-500 text-orange-500 " : "border-transparent"}`}
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Feature
            </a>
            <a
              href="#pricing"
              onClick$={() => activeLink.value = 'pricing'}
              class={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent ${activeLink.value === 'pricing' ? "border-orange-500 text-orange-500 " : "border-transparent"}`}
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pricing
            </a>
          </ul>
        </div>
      </nav>
    </>
  )
})