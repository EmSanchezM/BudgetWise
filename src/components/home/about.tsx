import { component$ } from "@builder.io/qwik";
import { ButtonPrimary } from "../shared";

export const About = component$(() => {
  return (
    <section class="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 class="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">Want anything to be easy with <strong>BudgetWise</strong>.</h1>
          <p class="text-black mt-4 mb-6">
            A personal finance app that tracks expenses, creates budgets and provides money-saving tips.
          </p>
          <ButtonPrimary>Get Started</ButtonPrimary>
        </div>
        <div class="flex w-ful">
          <div class="h-full w-full">
            <img src="./girl-planning-budget-with-tablet-and-piggy-bank.png" width={612} height={383} alt="BudgetWise Ilustration" />
          </div>
        </div>
      </div>
      <div class="relative w-full flex">
        <div class="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          <section class="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0">
            <article class="flex mx-auto w-40 sm:w-auto">
              <header class="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src="./girl-planning-budget-with-tablet-and-piggy-bank.png" class="h-6 w-6" width={24} height={24} alt="BudgetWise Ilustration" />
              </header>
              <main class="flex flex-col">
                <p class="text-xl text-black-600 font-bold">
                  200+
                </p>
                <p class="text-lg text-black-500">Users</p>
              </main>
            </article>
          </section>
          <section class="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0">
            <article class="flex mx-auto w-40 sm:w-auto">
              <header class="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src="./girl-planning-budget-with-tablet-and-piggy-bank.png" class="h-6 w-6" width={24} height={24} alt="BudgetWise Ilustration" />
              </header>
              <main class="flex flex-col">
                <p class="text-xl text-black-600 font-bold">
                  200+
                </p>
                <p class="text-lg text-black-500">Users</p>
              </main>
            </article>
          </section>
          <section class="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0">
            <article class="flex mx-auto w-40 sm:w-auto">
              <header class="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                <img src="./girl-planning-budget-with-tablet-and-piggy-bank.png" class="h-6 w-6" width={24} height={24} alt="BudgetWise Ilustration" />
              </header>
              <main class="flex flex-col">
                <p class="text-xl text-black-600 font-bold">
                  200+
                </p>
                <p class="text-lg text-black-500">Users</p>
              </main>
            </article>
          </section>
        </div>
        <div
          class="absolute bg-black opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </section>
  )
})