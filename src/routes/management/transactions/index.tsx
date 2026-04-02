import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination } from "~/components/shared";

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
        account: {
          select: {
            name: true,
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
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

  // Reverse the balance: if it was expense (-amount), add it back; if income (+amount), subtract it
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

export default component$(() => {
  const transactions = useTransactions();
  const deleteTransaction = useDeleteTransaction();

  return (
    <section>
      <header class="mb-4">
        <h1 class="font-bold capitalize text-2xl mb-4">Transactions</h1>
        <Link href="create" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create transaction</Link>
      </header>
      <div class="flex gap-2 mb-4 text-sm">
        <span class="text-gray-500">Filter:</span>
        <Link href="?type=" class="text-indigo-600 hover:underline">All</Link>
        <Link href="?type=income" class="text-indigo-600 hover:underline">Income</Link>
        <Link href="?type=expense" class="text-indigo-600 hover:underline">Expense</Link>
      </div>
      <div class="flex gap-2 mb-4 text-sm">
        <span class="text-gray-500">Sort by:</span>
        <Link href="?sort=name&order=asc" class="text-indigo-600 hover:underline">Name</Link>
        <Link href="?sort=amount&order=desc" class="text-indigo-600 hover:underline">Amount</Link>
        <Link href="?sort=transactionDate&order=desc" class="text-indigo-600 hover:underline">Date</Link>
        <Link href="?sort=createdAt&order=desc" class="text-indigo-600 hover:underline">Newest</Link>
      </div>
      <main class="mb-4">
        {transactions.value.items.length === 0 ? (
          <EmptyState title="No transactions yet" description="Create your first transaction to get started." />
        ) : (
          transactions.value.items.map(transaction => {
            return (
              <article class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <Link href={`${transaction.id}`}>
                  <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{transaction.name}</span>
                </Link>
                <span class="mb-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{transaction.isExpense ? 'Expense' : 'Income'}</span>
                <p class="mb-3 font-normal text-gray-700">
                  {transaction.description}
                  {transaction.account.name} - {GetFormatterForCurrency(transaction.currency).format(fromCents(transaction.amount))}
                </p>
                <Link href={`${transaction.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Detail
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
                <Form action={deleteTransaction} class="inline-flex">
                  <input type="hidden" name="id" value={transaction.id} />
                  <button type="submit" class="inline-flex items-center px-3 py-2 mx-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Delete
                  </button>
                </Form>
              </article>
            )
          })
        )}
      </main>
      <Pagination currentPage={transactions.value.page} totalPages={transactions.value.totalPages} baseUrl="/management/transactions" />
    </section>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Transactions",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
