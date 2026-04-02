import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination } from "~/components/ui";

import orm from "~/lib/orm";
import { fromCents, GetFormatterForCurrency } from "~/lib/utils";

export const useAccounts = routeLoader$(async ({ sharedMap, url }) => {
  const user = getAuthenticatedUser(sharedMap);

  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 10;
  const sort = url.searchParams.get("sort") || "createdAt";
  const order = url.searchParams.get("order") || "desc";
  const orderBy = { [sort]: order };

  const where = {
    userId: +user.id,
    deletedAt: null
  };

  const [accounts, total] = await Promise.all([
    orm.account.findMany({
      where,
      select: {
        id: true,
        name: true,
        numberAccount: true,
        balance: true,
        type: true,
        currency: true,
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
    orm.account.count({ where }),
  ]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return { items: accounts, page, totalPages: Math.ceil(total / pageSize), totalBalance };
});

export const useDeleteAccount = routeAction$(async (data, { fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(data.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.account.update({
    where: { id, userId: user.id },
    data: { deletedAt: new Date() },
  });

  return { success: true };
});

const typeIcons: Record<string, string> = {
  SAVINGS: "savings",
  CHECKING: "account_balance",
  INVESTMENT: "trending_up",
  CREDIT: "credit_card",
};

export default component$(() => {
  const accounts = useAccounts();
  const deleteAccount = useDeleteAccount();

  const totalFormatted = fromCents(accounts.value.totalBalance).toLocaleString("en-US", { minimumFractionDigits: 2 });
  const [whole, decimal] = totalFormatted.split(".");

  return (
    <div class="space-y-8">
      {/* Header: Total Liquidity */}
      <section class="space-y-2">
        <p class="text-on-surface-variant text-[10px] uppercase tracking-[0.1em] font-bold">
          Total Liquidity
        </p>
        <div class="flex items-baseline gap-2">
          <h1 class="text-[2.75rem] font-black tracking-tighter leading-none text-primary">
            ${whole}<span class="text-primary/40">.{decimal}</span>
          </h1>
        </div>
      </section>

      {/* Sort chips */}
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        <span class="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest self-center mr-1">Sort:</span>
        <Link href="?sort=name&order=asc" class="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">
          Name
        </Link>
        <Link href="?sort=balance&order=desc" class="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">
          Balance
        </Link>
        <Link href="?sort=createdAt&order=desc" class="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">
          Newest
        </Link>
      </div>

      {/* Account Cards */}
      {accounts.value.items.length === 0 ? (
        <EmptyState title="No accounts yet" description="Create your first account to get started." icon="account_balance" />
      ) : (
        <div class="space-y-3">
          {accounts.value.items.map((account) => {
            const icon = typeIcons[account.type] || "account_balance";

            return (
              <div
                key={account.id}
                class="bg-surface-container-lowest rounded-[2rem] p-6 editorial-shadow"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                      <span class="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    <div>
                      <h3 class="font-bold text-[15px] tracking-tight">{account.name}</h3>
                      <p class="text-on-surface-variant text-[12px]">{account.numberAccount}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container/30 px-2 py-0.5 rounded-md">
                    {account.type}
                  </span>
                </div>

                <div class="mb-4">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Available Balance</p>
                  <p class="text-2xl font-black tracking-tighter text-primary">
                    {GetFormatterForCurrency(account.currency).format(fromCents(account.balance))}
                  </p>
                </div>

                <div class="flex items-center gap-2">
                  <Link
                    href={`${account.id}`}
                    class="flex items-center gap-1 px-4 py-2 bg-surface-container-high text-primary rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
                  >
                    <span class="material-symbols-outlined text-[16px]">visibility</span>
                    Detail
                  </Link>
                  <Form action={deleteAccount}>
                    <input type="hidden" name="id" value={account.id} />
                    <button
                      type="submit"
                      class="flex items-center gap-1 px-4 py-2 bg-error-container/20 text-error rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-error-container/40 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[16px]">delete</span>
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Account */}
      <Link
        href="create"
        class="flex items-center justify-center gap-2 w-full py-4 rounded-[2rem] ghost-border text-primary font-bold text-sm hover:bg-surface-container-low transition-colors active:scale-[0.98]"
      >
        <span class="material-symbols-outlined">add</span>
        Add New Account
      </Link>

      <Pagination currentPage={accounts.value.page} totalPages={accounts.value.totalPages} baseUrl="/management/accounts" />
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Accounts",
  meta: [
    {
      name: "description",
      content: "Manage your financial accounts",
    },
  ],
};
