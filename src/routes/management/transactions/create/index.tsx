import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, zod$, Form, routeLoader$, Link } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/ui";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { z } from "zod";
import { currencies } from "~/lib/utils";
import { CreateTransactionSchemaValidation } from "~/lib/validation-schemes";

export const useAccounts = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  return orm.account.findMany({
    where: { userId: user.id, deletedAt: null },
    select: { id: true, name: true, numberAccount: true },
  });
});

export const useCategories = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  return orm.category.findMany({
    where: { userId: user.id, deletedAt: null },
    select: { id: true, name: true },
  });
});

export const useCreateTransaction = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = getAuthenticatedUser(sharedMap);

  const payload = {
    userId: +user.id,
    name: data.name,
    transactionDate: new Date(data.transactionDate),
    amount: data.amount,
    currency: data.currency,
    description: data.description,
    accountId: data.account,
    isExpense: data.isExpense === 'true',
    categoryId: data.category ? Number(data.category) : undefined,
  };

  const isExpense = data.isExpense === 'true';
  const amount = data.amount;

  const [transaction] = await orm.$transaction([
    orm.transaction.create({ data: payload, select: { id: true } }),
    orm.account.update({
      where: { id: data.account },
      data: { balance: { increment: isExpense ? -amount : amount } },
    }),
  ]);

  if (!transaction.id) return fail(500, { message: 'Error create transaction' });

  throw redirect(302, MANAGEMENT_ROUTES.TRANSACTIONS);
}, zod$({
  ...CreateTransactionSchemaValidation,
  isExpense: z.string({ required_error: 'Transaction type is required' }),
  category: z.coerce.number().optional(),
}));

export default component$(() => {
  const accounts = useAccounts();
  const categories = useCategories();
  const action = useCreateTransaction();

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.TRANSACTIONS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to transactions
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">New Transaction</h1>
        <p class="text-on-surface-variant text-sm leading-relaxed">Record a new transaction in your financial ledger.</p>
      </div>

      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <FormGroup type="select" label="Transaction Type" id="isExpense" name="isExpense" items={[{ id: 'false', name: 'Income' }, { id: 'true', name: 'Expense' }]} errors={action.value?.fieldErrors?.isExpense} />
          <FormGroup type="select" label="Account" id="account" name="account" items={accounts.value.map(a => ({ id: a.id, name: `${a.name} (${a.numberAccount})` }))} errors={action.value?.fieldErrors?.account} />
          <FormGroup type="select" label="Category" id="category" name="category" placeholder="Select category (optional)" items={categories.value.map(c => ({ id: c.id, name: c.name }))} errors={action.value?.fieldErrors?.category} />
          <FormGroup type="text" label="Name" id="name" name="name" placeholder="e.g. Coffee at Blue Door" errors={action.value?.fieldErrors?.name} />
          <FormGroup type="date" label="Date" id="transactionDate" name="transactionDate" errors={action.value?.fieldErrors?.transactionDate} />
          <FormGroup type="select" label="Currency" id="currency" name="currency" items={currencies.map(c => ({ id: c.value, name: c.label }))} errors={action.value?.fieldErrors?.currency} />
          <FormGroup type="number" label="Amount" id="amount" name="amount" placeholder="0" errors={action.value?.fieldErrors?.amount} />
          <FormGroup type="text" label="Description" id="description" name="description" placeholder="Optional notes" errors={action.value?.fieldErrors?.description} />

          <button type="submit" disabled={action.isRunning} class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {action.isRunning ? 'Creating...' : 'Create Transaction'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Create Transaction",
  meta: [{ name: "description", content: "Create a new financial transaction" }],
};
