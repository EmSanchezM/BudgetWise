import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, zod$, Form, Link } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/ui";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateAccountSchemaValidation } from "~/lib/validation-schemes";

export const useCreateAccount = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = getAuthenticatedUser(sharedMap);

  const account = await orm.account.create({
    data: {
      userId: user.id,
      name: data.name,
      numberAccount: data.numberAccount,
      type: data.type,
      currency: data.currency,
      balance: data.balance,
    },
    select: { id: true }
  });

  if (!account.id) return fail(500, { message: 'Error create account' });

  throw redirect(302, MANAGEMENT_ROUTES.ACCOUNTS);
}, zod$(CreateAccountSchemaValidation));

export default component$(() => {
  const action = useCreateAccount();

  return (
    <div class="max-w-lg mx-auto">
      {/* Header */}
      <div class="mb-8">
        <Link href={MANAGEMENT_ROUTES.ACCOUNTS} class="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-4">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to accounts
        </Link>
        <h1 class="font-headline font-bold text-3xl tracking-tight text-primary mb-2">
          Create Account
        </h1>
        <p class="text-on-surface-variant text-sm leading-relaxed">
          Add a new bank account to track your finances.
        </p>
      </div>

      {/* Form */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-5">
          <FormGroup
            type="text"
            label="Account Name"
            id="name"
            name="name"
            placeholder="e.g. Main Checking"
            errors={action.value?.fieldErrors?.name}
          />

          <FormGroup
            type="text"
            label="Account Number"
            id="numberAccount"
            name="numberAccount"
            placeholder="e.g. 1234-5678-9012"
            errors={action.value?.fieldErrors?.numberAccount}
          />

          <FormGroup
            type="text"
            label="Account Type"
            id="type"
            name="type"
            placeholder="e.g. SAVINGS, CHECKING"
            errors={action.value?.fieldErrors?.type}
          />

          <FormGroup
            type="select"
            label="Currency"
            id="currency"
            name="currency"
            placeholder="Select currency"
            items={currencies.map(currency => ({ id: currency.value, name: currency.label }))}
            errors={action.value?.fieldErrors?.currency}
          />

          <FormGroup
            type="number"
            label="Initial Balance"
            id="balance"
            name="balance"
            placeholder="0"
            errors={action.value?.fieldErrors?.balance}
          />

          <button
            type="submit"
            disabled={action.isRunning}
            class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {action.isRunning ? 'Creating...' : 'Create Account'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Create Account",
  meta: [
    {
      name: "description",
      content: "Create a new financial account",
    },
  ],
};
