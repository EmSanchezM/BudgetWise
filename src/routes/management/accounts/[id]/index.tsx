import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import orm from "~/lib/orm";
import { fromCents } from "~/lib/utils";

export const useAccount = routeLoader$(async ({ params, fail, sharedMap }) => {
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: 'Invalid ID' });

  const user = getAuthenticatedUser(sharedMap);

  const account = await orm.account.findUnique({
    where: { id, userId: user.id, deletedAt: null },
    select: {
      name: true,
      numberAccount: true,
      type: true,
      balance: true,
      currency: true,
    }
  });

  if (!account) return fail(404, { message: 'Account not found' });

  return account;
});

export const useUpdateAccount = routeAction$(async (data, { params, fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(params.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.account.update({
    where: { id, userId: user.id },
    data: {
      name: data.name as string,
      numberAccount: data.numberAccount as string,
      type: data.type as string,
      currency: data.currency as string,
      balance: Number(data.balance),
    },
  });

  return { success: true };
});

export default component$(() => {
  const account = useAccount();
  const action = useUpdateAccount();

  return (
    <div class="max-w-lg mx-auto">
      {/* Header */}
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.ACCOUNTS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to accounts
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">
          Account Detail
        </h1>
      </div>

      {/* Account info card */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow mb-8">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Name</p>
            <p class="text-base font-bold text-primary">{account.value.name}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Account Number</p>
            <p class="text-base font-bold text-primary">{account.value.numberAccount}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Type</p>
            <span class="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container/30 px-2 py-0.5 rounded-md">
              {account.value.type}
            </span>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Balance</p>
            <p class="text-2xl font-black tracking-tighter text-primary">
              ${fromCents(account.value.balance as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Update form */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <h2 class="font-bold text-lg tracking-tight text-primary mb-6">Update Account</h2>

        {action.value?.success && (
          <div class="mb-6 p-4 bg-on-tertiary-container/10 rounded-xl">
            <p class="text-on-tertiary-container text-sm font-medium">Account updated successfully.</p>
          </div>
        )}

        <Form action={action} class="space-y-5">
          <div>
            <label for="name" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
            <input
              type="text" id="name" name="name"
              value={account.value.name ?? action.formData?.get('name')}
              class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div>
            <label for="numberAccount" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Account Number</label>
            <input
              type="text" id="numberAccount" name="numberAccount"
              value={account.value.numberAccount ?? action.formData?.get('numberAccount')}
              class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div>
            <label for="type" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Type</label>
            <input
              type="text" id="type" name="type"
              value={account.value.type ?? action.formData?.get('type')}
              class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div>
            <label for="currency" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Currency</label>
            <input
              type="text" id="currency" name="currency"
              value={account.value.currency ?? action.formData?.get('currency')}
              class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div>
            <label for="balance" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Balance</label>
            <input
              type="number" id="balance" name="balance"
              value={fromCents(account.value.balance as number) ?? action.formData?.get('balance')}
              class="block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all"
          >
            Update Account
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Account Detail",
  meta: [
    {
      name: "description",
      content: "View and update account details",
    },
  ],
};
