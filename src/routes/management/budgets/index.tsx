import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination } from "~/components/ui";

import orm from "~/lib/orm";
import { fromCents, GetFormatterForCurrency } from "~/lib/utils";

export const useBudgets = routeLoader$(async ({ sharedMap, url }) => {
  const user = getAuthenticatedUser(sharedMap);

  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 10;
  const sort = url.searchParams.get("sort") || "createdAt";
  const order = url.searchParams.get("order") || "desc";
  const orderBy = { [sort]: order };

  const where = { userId: user.id, deletedAt: null };

  const [budgets, total] = await Promise.all([
    orm.budget.findMany({
      where,
      select: { id: true, name: true, amount: true, currency: true, initDate: true, finishDate: true },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    orm.budget.count({ where }),
  ]);

  return { items: budgets, page, totalPages: Math.ceil(total / pageSize) };
});

export const useDeleteBudget = routeAction$(async (data, { fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(data.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.budget.update({
    where: { id, userId: user.id },
    data: { deletedAt: new Date() },
  });

  return { success: true };
});

export default component$(() => {
  const budgets = useBudgets();
  const deleteBudget = useDeleteBudget();

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-2xl">
          <h1 class="text-primary font-headline font-bold text-[2.5rem] lg:text-[3.5rem] leading-[1.1] tracking-tight mb-2">Budgets</h1>
          <p class="text-on-surface-variant text-sm lg:text-base leading-relaxed max-w-lg">
            Master the art of intentional allocation. Discipline today secures the editorial freedom of your financial future.
          </p>
        </div>
        <Link href="create" class="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shrink-0">
          <span class="material-symbols-outlined">add</span>
          Set New Budget
        </Link>
      </div>

      {/* Budget Cards */}
      {budgets.value.items.length === 0 ? (
        <EmptyState title="No budgets yet" description="Create your first budget to get started." icon="pie_chart" />
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.value.items.map((budget) => (
            <div key={budget.id} class="bg-surface-container-lowest p-8 rounded-xl editorial-shadow flex flex-col justify-between min-h-[240px] group">
              <div>
                <div class="flex justify-between items-start mb-6">
                  <div class="p-3 bg-surface-container-low rounded-xl">
                    <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
                  </div>
                  <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`${budget.id}`} class="p-1 text-outline hover:text-primary transition-colors">
                      <span class="material-symbols-outlined text-sm">edit</span>
                    </Link>
                    <Form action={deleteBudget} class="inline">
                      <input type="hidden" name="id" value={budget.id} />
                      <button type="submit" class="p-1 text-outline hover:text-error transition-colors">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </Form>
                  </div>
                </div>
                <Link href={`${budget.id}`}>
                  <h3 class="text-xl font-bold tracking-tight text-primary mb-1 hover:underline">{budget.name}</h3>
                </Link>
                <p class="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-4">
                  {budget.initDate.toLocaleDateString()} — {budget.finishDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <span class="text-primary font-bold text-2xl tracking-tighter">
                  {GetFormatterForCurrency(budget.currency).format(fromCents(budget.amount))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={budgets.value.page} totalPages={budgets.value.totalPages} baseUrl="/management/budgets" />
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Budgets",
  meta: [{ name: "description", content: "Manage your financial budgets" }],
};
