import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form, routeLoader$ } from "@builder.io/qwik-city";
import { FormGroup } from "~/components/shared/form";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { UserAuth } from "~/lib/models";

import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateTransactionSchemaValidation } from "~/lib/validation-schemes";

export const useAccounts = routeLoader$(async ({ sharedMap }) => {
  const user = sharedMap.get('user') as UserAuth;

  const accounts = await orm.account.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      name: true,
      numberAccount: true,
    }
  })

  return accounts
})

export const useCreateExpenseTransaction = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as UserAuth;

  const payload = {
    userId: user.id,
    name: data.name,
    transactionDate: data.transactionDate,
    amount: data.amount,
    currency: data.currency,
    description: data.description,
    accountId: data.account,
    isExpense: true,
  }

  const transaction = await orm.transaction.create({
    data: payload,
    select: { id: true }
  });

  if (!transaction.id) fail(500, { message: 'Error create transaction' });

  redirect(301, MANAGEMENT_ROUTES.TRANSACTIONS);
}, zod$(CreateTransactionSchemaValidation));

export default component$(() => {
  const accounts = useAccounts();
  const action = useCreateExpenseTransaction();

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-dashed">
          <img class="mx-auto h-72 w-auto object-cover" src="/girl-planning-budget-with-tablet-and-piggy-bank.png" alt="Budgetwise" width={100} height={40} />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create expense</h2>
          <p class="mx-2 my-4 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at illum, est quisquam, corporis eius maiores omnis nesciunt repellendus minima assumenda officiis error dolorum ipsum dolores nihil ad placeat quam?
          </p>
        </div>
        <Form action={action} class="space-y-6">
          <FormGroup
            type="select"
            labelName="Account"
            id="account"
            name="account"
            items={accounts.value.map(account => ({ id: account.id, name: `${account.name}(${account.numberAccount})` }))}
            errors={action.value?.fieldErrors?.account}
          />

          <FormGroup
            type="text"
            labelName="Transaction name"
            id="name"
            name="name"
            errors={action.value?.fieldErrors?.name}
          />

          <FormGroup
            type="date"
            labelName="Transaction date"
            id="transactionDate"
            name="transactionDate"
            errors={action.value?.fieldErrors?.transactionDate}
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
            labelName="Transaction amount"
            id="amount"
            name="amount"
            errors={action.value?.fieldErrors?.amount}
          />

          <FormGroup
            type="text"
            labelName="Description"
            id="description"
            name="description"
            errors={action.value?.fieldErrors?.description}
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
  title: "BudgetWise | Create expense",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};