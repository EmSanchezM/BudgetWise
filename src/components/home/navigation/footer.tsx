import { component$ } from "@builder.io/qwik";

export const Footer = component$(() => {
  return (
    <footer class="bg-white-300 pt-44 pb-24">
      <div class="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div class="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <span class="h-8 w-auto">BudgetWise</span>
          <p class="mb-4">
            <strong class="font-medium">BudgetWise</strong> is a personal finance app that tracks expenses, creates budgets and provides money-saving tips.
          </p>
          <div class="flex w-full mt-2 mb-8 -mx-2">
            <div class="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
                  fill="rgba(245,56,56,1)"
                />
              </svg>
            </div>
          </div>
          <p class="text-gray-400">©{new Date().getFullYear()} - BudgetWise</p>
        </div>
        <div class="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p class="text-black-600 mb-4 font-medium text-lg">Product</p>
          <ul class="text-black-500 ">
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Download{" "}
            </li>
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Pricing{" "}
            </li>
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Locations{" "}
            </li>
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Server{" "}
            </li>
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Countries{" "}
            </li>
            <li class="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog{" "}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
})