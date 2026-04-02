import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/shared/form";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateAccountSchemaValidation } from "~/lib/validation-schemes";

export const useCreateAccount = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = getAuthenticatedUser(sharedMap);

  const account = await orm.account.create({
    data: {
      userId: +user.id,
      name: data.name,
      numberAccount: data.numberAccount,
      type: data.type,
      currency: data.currency,
      balance: data.balance,
    },
    select: { id: true }
  });

  if (!account.id) return fail(500, { message: 'Error create account' });

  throw redirect(302, MANAGEMENT_ROUTES.ACCOUNTS);
}, zod$(CreateAccountSchemaValidation));

export default component$(() => {
  const action = useCreateAccount();

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-dashed">
          <img class="mx-auto h-72 w-auto object-cover" src="/girl-planning-budget-with-tablet-and-piggy-bank.png" alt="Budgetwise" width={100} height={40} />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>
          <p class="mx-2 my-4 text-center">
            Create a new bank account to track your finances. Enter the account details below.
          </p>
        </div>
        <Form action={action} class="space-y-6">
          <FormGroup
            type="text"
            labelName="Account Name"
            id="name"
            name="name"
            errors={action.value?.fieldErrors?.name}
          />

          <FormGroup
            type="text"
            labelName="Account Number"
            id="numberAccount"
            name="numberAccount"
            errors={action.value?.fieldErrors?.numberAccount}
          />

          <FormGroup
            type="text"
            labelName="Account Type"
            id="type"
            name="type"
            errors={action.value?.fieldErrors?.type}
          />

          <FormGroup
            type="select"
            labelName="Currency"
            id="currency"
            name="currency"
            items={currencies.map(currency => ({ id: currency.value, name: currency.label }))}
            errors={action.value?.fieldErrors?.currency}
          />

          <FormGroup
            type="number"
            labelName="Account Balance"
            id="balance"
            name="balance"
            errors={action.value?.fieldErrors?.balance}
          />

          <div>
            <button type="submit" disabled={action.isRunning} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed">{action.isRunning ? 'Loading...' : 'Create'}</button>
          </div>
        </Form>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: "BudgetWise | Create account",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};