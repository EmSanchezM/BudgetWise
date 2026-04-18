import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, zod$, Form, routeLoader$ } from "@builder.io/qwik-city";
import { FormGroup } from "~/components/ui";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";

import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateTransactionSchemaValidation } from "~/lib/validation-schemes";

export const useAccounts = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);

  const accounts = await orm.account.findMany({
    where: {
      userId: user.id,
      deletedAt: null
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
  const user = getAuthenticatedUser(sharedMap);

  const payload = {
    userId: user.id,
    name: data.name,
    transactionDate: new Date(data.transactionDate),
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

  if (!transaction.id) return fail(500, { message: 'Error create transaction' });

  throw redirect(302, MANAGEMENT_ROUTES.TRANSACTIONS);
}, zod$(CreateTransactionSchemaValidation));

export default component$(() => {
  const accounts = useAccounts();
  const action = useCreateExpenseTransaction();

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">New Expense</h1>
        <p class="text-on-surface-variant text-sm leading-relaxed">Record a new expense transaction.</p>
      </div>
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <FormGroup type="select" label="Account" id="account" name="account" items={accounts.value.map(a => ({ id: a.id, name: `${a.name} (${a.numberAccount})` }))} errors={action.value?.fieldErrors?.account} />
          <FormGroup type="text" label="Name" id="name" name="name" placeholder="e.g. Grocery Shopping" errors={action.value?.fieldErrors?.name} />
          <FormGroup type="date" label="Date" id="transactionDate" name="transactionDate" errors={action.value?.fieldErrors?.transactionDate} />
          <FormGroup type="select" label="Currency" id="currency" name="currency" items={currencies.map(c => ({ id: c.value, name: c.label }))} errors={action.value?.fieldErrors?.currency} />
          <FormGroup type="number" label="Amount" id="amount" name="amount" placeholder="0" errors={action.value?.fieldErrors?.amount} />
          <FormGroup type="text" label="Description" id="description" name="description" placeholder="Optional notes" errors={action.value?.fieldErrors?.description} />
          <button type="submit" disabled={action.isRunning} class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">{action.isRunning ? 'Creating...' : 'Create Expense'}</button>
        </Form>
      </div>
    </div>
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