import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { UserAuth } from "~/lib/models";

import orm from "~/lib/orm";
import { GetFormatterForCurrency } from "~/lib/utils";

export const useAccounts = routeLoader$(async ({ sharedMap }) => {
  const user = sharedMap.get('user') as UserAuth;

  const accounts = await orm.account.findMany({
    where: {
      userId: +user.id
    },
    select: {
      id: true,
      name: true,
      numberAccount: true,
      balance: true,
      type: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      }
    }
  });

  return accounts;
});

export default component$(() => {
  const accounts = useAccounts();

  return (
    <section>
      <header class="mb-4">
        <h1 class="font-bold capitalize text-2xl mb-4">Accounts</h1>
        <Link href="create" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create account</Link>
      </header>
      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          accounts.value.map(account => {
            return (
              <article class="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <Link href={`${account.id}`}>
                  <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{account.name} ({account.numberAccount})</span>
                </Link>
                <p class="mb-3 font-normal text-gray-700">
                  <span>{account.user.firstName} {account.user.lastName}</span>
                  <br />
                  {GetFormatterForCurrency('USD').format(account.balance)}
                  <span class="mb-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{account.type}</span>
                </p>
                <Link href={`${account.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Detail
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
                <button class="inline-flex items-center px-3 py-2 mx-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Delete
                </button>
              </article>
            )
          })
        }
      </main>
    </section>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Accounts",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};