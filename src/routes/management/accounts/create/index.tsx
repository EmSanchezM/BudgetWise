import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/shared/form";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";
import { CreateAccountSchemaValidation } from "~/lib/validation-schemes";

export const useCreateAccount = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as UserAuth;

  const payload = {
    userId: +user.id,
    name: data.name,
    numberAccount: data.numberAccount,
    type: data.type,
    balance: data.balance,
  }

  const account = await orm.account.create({
    data: payload,
    select: { id: true }
  });

  if (!account.id) fail(500, { message: 'Error create account' });

  redirect(301, MANAGEMENT_ROUTES.ACCOUNTS);
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at illum, est quisquam, corporis eius maiores omnis nesciunt repellendus minima assumenda officiis error dolorum ipsum dolores nihil ad placeat quam?
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
            type="number"
            labelName="Account Balance"
            id="balance"
            name="balance"
            errors={action.value?.fieldErrors?.balance}
          />

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
          </div>
        </Form>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: "BudgetWise App | Create budget",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};