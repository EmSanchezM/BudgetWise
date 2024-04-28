import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form, routeLoader$ } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateTransactionSchemaValidation } from "~/lib/validation-schemes";

export const useAccounts = routeLoader$(async () => {
  const accounts = await orm.account.findMany({
    select: {
      id: true,
      name: true,
      numberAccount: true,
    }
  })

  return accounts
})

export const useCreateIncomeTransaction = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };

  const payload = {
    userId: +user.id,
    name: data.name,
    transactionDate: data.transactionDate,
    amount: data.amount,
    currency: data.currency,
    description: data.description,
    accountId: data.account,
    isExpense: false,
  }

  const transaction = await orm.transaction.create({
    data: payload,
    select: { id: true }
  });

  if (!transaction.id) fail(500, { message: 'Error create transaction' });

  redirect(301, '/admin/transactions');
}, zod$(CreateTransactionSchemaValidation));

export default component$(() => {
  const accounts = useAccounts();
  const action = useCreateIncomeTransaction();

  return (
    <>
      <Form action={action} class="space-y-6">
        <div>
          <label for="account" class="block text-sm font-medium leading-6 text-gray-900">Account</label>
          <div class="mt-2">
            <select name="account" id="account" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required>
              <option value="">Select your account</option>
              {
                accounts.value.map((account) => {
                  return (
                    <option value={account.id.toString()}>{`${account.name}(${account.numberAccount})`}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Transaction name</label>
          <div class="mt-2">
            <input id="name" name="name" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="transactionDate" class="block text-sm font-medium leading-6 text-gray-900">Transaction date</label>
          <div class="mt-2">
            <input id="transactionDate" name="transactionDate" type="date" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="currency" class="block text-sm font-medium leading-6 text-gray-900">Currency</label>
          <div class="mt-2">
            <select name="currency" id="currency" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required>
              <option value="">Select your currency</option>
              {
                currencies.map((currency) => {
                  return (
                    <option value={currency.value}>{currency.label}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div class="mt-2">
            <input id="amount" name="amount" type="number" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div class="mt-2">
            <input id="description" name="description" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
        </div>
      </Form >
    </>
  )
})

export const head: DocumentHead = {
  title: "BudgetWise | Create income",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};