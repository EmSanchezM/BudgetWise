import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useTransaction = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const transaction = await orm.transaction.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true,
      transactionDate: true,
      amount: true,
      currency: true,
      description: true,
      isExpense: true,
      account: { select: { name: true, numberAccount: true, type: true } },
    },
  });

  if (!transaction) return fail(404, { message: 'Transaction not found' });
  return transaction;
});

export const useUpdateTransaction = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.transaction.update({
    where: { id, userId: +user.id },
    data: {
      name: data.name as string,
      transactionDate: new Date(data.transactionDate as string),
      amount: Number(data.amount),
      currency: data.currency as string,
      description: data.description as string,
    },
  });

  return { success: true };
});

export default component$(() => {
  const transaction = useTransaction();
  const action = useUpdateTransaction();

  const formatDateForInput = (date: unknown) => new Date(String(date)).toISOString().split('T')[0];

  const inputClass = "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20";

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <a href={MANAGEMENT_ROUTES.TRANSACTIONS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to transactions
        </a>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">Transaction Detail</h1>
      </div>

      {/* Info card */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-xl tracking-tight">{transaction.value.name}</h3>
          <span class={[
            "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
            transaction.value.isExpense ? "bg-error-container/30 text-error" : "bg-on-tertiary-container/10 text-on-tertiary-container",
          ].join(" ")}>
            {transaction.value.isExpense ? "Expense" : "Income"}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Amount</p>
            <p class={["text-2xl font-black tracking-tighter", transaction.value.isExpense ? "text-primary" : "text-on-tertiary-container"].join(" ")}>
              {transaction.value.isExpense ? "-" : "+"}${fromCents(transaction.value.amount as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Date</p>
            <p class="text-base font-bold text-primary">{new Date(String(transaction.value.transactionDate)).toLocaleDateString()}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Account</p>
            <p class="text-sm font-medium text-on-surface">{transaction.value.account?.name}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Currency</p>
            <p class="text-sm font-medium text-on-surface">{transaction.value.currency}</p>
          </div>
        </div>
        {transaction.value.description && (
          <div class="mt-4 pt-4 border-t border-outline-variant/10">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Description</p>
            <p class="text-sm text-on-surface-variant">{transaction.value.description}</p>
          </div>
        )}
      </div>

      {/* Update form */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <h2 class="font-bold text-lg tracking-tight text-primary mb-6">Update Transaction</h2>

        {action.value?.success && (
          <div class="mb-6 p-4 bg-on-tertiary-container/10 rounded-xl">
            <p class="text-on-tertiary-container text-sm font-medium">Transaction updated successfully.</p>
          </div>
        )}

        <Form action={action} class="space-y-5">
          <div>
            <label for="name" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
            <input type="text" id="name" name="name" value={transaction.value.name ?? action.formData?.get('name')} class={inputClass} />
          </div>
          <div>
            <label for="transactionDate" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Date</label>
            <input type="date" id="transactionDate" name="transactionDate" value={formatDateForInput(transaction.value.transactionDate) ?? action.formData?.get('transactionDate')} class={inputClass} />
          </div>
          <div>
            <label for="amount" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Amount</label>
            <input type="number" id="amount" name="amount" value={fromCents(transaction.value.amount as number) ?? action.formData?.get('amount')} class={inputClass} />
          </div>
          <div>
            <label for="currency" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Currency</label>
            <input type="text" id="currency" name="currency" value={transaction.value.currency ?? action.formData?.get('currency')} class={inputClass} />
          </div>
          <div>
            <label for="description" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <input type="text" id="description" name="description" value={transaction.value.description ?? action.formData?.get('description')} class={inputClass} />
          </div>
          <button type="submit" class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all">Update Transaction</button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Transaction Detail",
  meta: [{ name: "description", content: "View and update transaction details" }],
};
