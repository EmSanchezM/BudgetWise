import { component$, useSignal } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination, ConfirmDialog } from "~/components/ui";

import orm from "~/lib/orm";
import { fromCents, GetFormatterForCurrency } from "~/lib/utils";

export const useTransactions = routeLoader$(async ({ sharedMap, url }) => {
  const user = getAuthenticatedUser(sharedMap);

  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 10;
  const sort = url.searchParams.get("sort") || "createdAt";
  const order = url.searchParams.get("order") || "desc";
  const orderBy = { [sort]: order };

  const type = url.searchParams.get("type");
  const where: any = { userId: +user.id, deletedAt: null };
  if (type === "income") where.isExpense = false;
  if (type === "expense") where.isExpense = true;

  const [transactions, total] = await Promise.all([
    orm.transaction.findMany({
      where,
      select: {
        id: true,
        name: true,
        amount: true,
        currency: true,
        transactionDate: true,
        description: true,
        isExpense: true,
        account: { select: { name: true } },
        user: { select: { firstName: true, lastName: true } },
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    orm.transaction.count({ where }),
  ]);

  return { items: transactions, page, totalPages: Math.ceil(total / pageSize) };
});

export const useDeleteTransaction = routeAction$(async (data, { fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(data.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  const transaction = await orm.transaction.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: { amount: true, isExpense: true, accountId: true },
  });

  if (!transaction) return fail(404, { message: "Transaction not found" });

  const balanceAdjustment = transaction.isExpense ? transaction.amount : -transaction.amount;

  await orm.$transaction([
    orm.transaction.update({
      where: { id, userId: user.id },
      data: { deletedAt: new Date() },
    }),
    orm.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: balanceAdjustment } },
    }),
  ]);

  return { success: true };
});

function formatDate(date: string | Date): string {
  return new Date(String(date)).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default component$(() => {
  const transactions = useTransactions();
  const deleteTransaction = useDeleteTransaction();
  const showDeleteDialog = useSignal(false);
  const deleteId = useSignal<number | null>(null);

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-primary font-headline font-bold text-[2.5rem] lg:text-[3.5rem] leading-[1.1] tracking-tight mb-2">
            Ledger
          </h1>
          <p class="text-on-surface-variant text-sm lg:text-base leading-relaxed max-w-lg">
            Every transaction tells a story. Curate your financial narrative with precision.
          </p>
        </div>
        <Link
          href="create"
          class="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shrink-0"
        >
          <span class="material-symbols-outlined">add</span>
          New Transaction
        </Link>
      </div>

      {/* Filter chips */}
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { label: "All Activity", href: "?" },
          { label: "Income", href: "?type=income" },
          { label: "Expense", href: "?type=expense" },
        ].map((filter) => (
          <Link
            key={filter.label}
            href={filter.href}
            class="px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap active:scale-95"
          >
            {filter.label}
          </Link>
        ))}
      </div>

      {/* Transaction List */}
      {transactions.value.items.length === 0 ? (
        <EmptyState title="No transactions yet" description="Create your first transaction to get started." icon="receipt_long" />
      ) : (
        <div class="space-y-1">
          {transactions.value.items.map((tx) => (
            <div
              key={tx.id}
              class="flex items-center p-4 bg-surface-container-low rounded-xl group active:scale-[0.98] transition-all"
            >
              <div class={[
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                tx.isExpense ? "bg-surface-container-highest" : "bg-on-tertiary-container/10",
              ].join(" ")}>
                <span class={[
                  "material-symbols-outlined",
                  tx.isExpense ? "text-primary" : "text-on-tertiary-container",
                ].join(" ")}>
                  {tx.isExpense ? "shopping_bag" : "account_balance"}
                </span>
              </div>
              <div class="ml-4 flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <Link href={`${tx.id}`}>
                    <p class="font-bold text-[15px] tracking-tight truncate hover:underline">{tx.name}</p>
                  </Link>
                  <span class={[
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                    tx.isExpense ? "bg-error-container/30 text-error" : "bg-on-tertiary-container/10 text-on-tertiary-container",
                  ].join(" ")}>
                    {tx.isExpense ? "Expense" : "Income"}
                  </span>
                </div>
                <p class="text-on-surface-variant text-[12px] truncate">
                  {tx.account.name} &middot; {formatDate(tx.transactionDate)}
                </p>
              </div>
              <div class="text-right ml-3 flex items-center gap-2">
                <p class={[
                  "font-black",
                  tx.isExpense ? "text-primary" : "text-on-tertiary-container",
                ].join(" ")}>
                  {tx.isExpense ? "-" : "+"}{GetFormatterForCurrency(tx.currency).format(fromCents(tx.amount))}
                </p>
                <div class="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`${tx.id}`} class="p-1 text-outline hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-sm">edit</span>
                  </Link>
                  <button type="button" onClick$={() => { deleteId.value = tx.id; showDeleteDialog.value = true; }} class="p-1 text-outline hover:text-error transition-colors">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={transactions.value.page} totalPages={transactions.value.totalPages} baseUrl="/management/transactions" />

      <ConfirmDialog open={showDeleteDialog} title="Delete transaction?" description="This transaction will be permanently removed and the account balance will be adjusted.">
        <Form action={deleteTransaction} onSubmitCompleted$={() => { showDeleteDialog.value = false; deleteId.value = null; }}>
          <input type="hidden" name="id" value={deleteId.value ?? ''} />
          <button type="submit" class="w-full py-3 rounded-xl font-bold text-sm bg-error text-on-error active:scale-95 transition-all">Delete</button>
        </Form>
      </ConfirmDialog>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Transactions",
  meta: [{ name: "description", content: "Manage your financial transactions" }],
};
