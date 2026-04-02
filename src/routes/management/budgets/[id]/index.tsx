import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useBudget = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const budget = await orm.budget.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true, initDate: true, finishDate: true, amount: true, currency: true, categoryId: true,
      category: { select: { name: true, color: true } },
    },
  });

  if (!budget) return fail(404, { message: 'Budget not found' });
  return budget;
});

export const useUpdateBudget = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.budget.update({
    where: { id, userId: user.id },
    data: {
      name: data.name as string,
      initDate: new Date(data.initDate as string),
      finishDate: new Date(data.finishDate as string),
      amount: Number(data.amount),
      currency: data.currency as string,
    },
  });

  return { success: true };
});

export default component$(() => {
  const budget = useBudget();
  const action = useUpdateBudget();

  const formatDateForInput = (date: unknown) => new Date(String(date)).toISOString().split('T')[0];
  const inputClass = "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20";

  return (
    <div class="max-w-lg mx-auto">
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.BUDGETS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to budgets
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">Budget Detail</h1>
      </div>

      {/* Info card */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow mb-8">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Name</p>
            <p class="text-base font-bold text-primary">{budget.value.name}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Amount</p>
            <p class="text-2xl font-black tracking-tighter text-primary">${fromCents(budget.value.amount as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Period</p>
            <p class="text-sm font-medium text-on-surface">{new Date(String(budget.value.initDate)).toLocaleDateString()} — {new Date(String(budget.value.finishDate)).toLocaleDateString()}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Category</p>
            <div class="flex items-center gap-2">
              {budget.value.category?.color && <div class="w-3 h-3 rounded-full" style={{ backgroundColor: budget.value.category.color }}></div>}
              <p class="text-sm font-medium text-on-surface">{budget.value.category?.name || 'None'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Update form */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <h2 class="font-bold text-lg tracking-tight text-primary mb-6">Update Budget</h2>

        {action.value?.success && (
          <div class="mb-6 p-4 bg-on-tertiary-container/10 rounded-xl">
            <p class="text-on-tertiary-container text-sm font-medium">Budget updated successfully.</p>
          </div>
        )}

        <Form action={action} class="space-y-5">
          <div>
            <label for="name" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
            <input type="text" id="name" name="name" value={budget.value.name ?? action.formData?.get('name')} class={inputClass} />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="initDate" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Start Date</label>
              <input type="date" id="initDate" name="initDate" value={formatDateForInput(budget.value.initDate) ?? action.formData?.get('initDate')} class={inputClass} />
            </div>
            <div>
              <label for="finishDate" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">End Date</label>
              <input type="date" id="finishDate" name="finishDate" value={formatDateForInput(budget.value.finishDate) ?? action.formData?.get('finishDate')} class={inputClass} />
            </div>
          </div>
          <div>
            <label for="amount" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Amount</label>
            <input type="number" id="amount" name="amount" value={fromCents(budget.value.amount as number) ?? action.formData?.get('amount')} class={inputClass} />
          </div>
          <div>
            <label for="currency" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Currency</label>
            <input type="text" id="currency" name="currency" value={budget.value.currency ?? action.formData?.get('currency')} class={inputClass} />
          </div>
          <button type="submit" class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all">Update Budget</button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Budget Detail",
  meta: [{ name: "description", content: "View and update budget details" }],
};
