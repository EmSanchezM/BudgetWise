import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, zod$ } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";
import { FormGroup } from "~/components/ui";

import orm from "~/lib/orm";
import { generateFromPassword } from "~/lib/utils";
import { SignUpSchemaValidation } from "~/lib/validation-schemes";

export const useSignUp = routeAction$(async (data, { fail, redirect }) => {
  const hashPassword = await generateFromPassword(data.password);

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashPassword
  };

  const user = await orm.user.create({ data: payload });

  if (!user.id) return fail(500, { message: 'Error' });

  throw redirect(302, PUBLIC_ROUTES.SIGN_IN);
}, zod$(SignUpSchemaValidation));

export default component$(() => {
  const action = useSignUp();

  return (
    <section class="flex items-center justify-center min-h-[calc(100vh-12rem)] px-6">
      <div class="w-full max-w-md">
        {/* Header */}
        <div class="mb-10">
          <div class="inline-block px-3 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
            Get Started
          </div>
          <h1 class="font-headline font-black text-4xl tracking-tighter text-primary leading-[0.95] mb-3">
            Create your account
          </h1>
          <p class="text-secondary text-sm leading-relaxed">
            Begin your journey to financial clarity.
          </p>
        </div>

        {/* Error message */}
        {action.value?.message && (
          <div class="mb-6 p-4 bg-error-container/30 rounded-xl">
            <p class="text-error text-sm font-medium">{action.value.message}</p>
          </div>
        )}

        {/* Form */}
        <Form action={action} class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <FormGroup
              type="text"
              label="First name"
              id="firstName"
              name="firstName"
              placeholder="John"
              errors={action.value?.fieldErrors?.firstName}
            />

            <FormGroup
              type="text"
              label="Last name"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              errors={action.value?.fieldErrors?.lastName}
            />
          </div>

          <FormGroup
            type="email"
            label="Email address"
            id="email"
            name="email"
            placeholder="you@example.com"
            errors={action.value?.fieldErrors?.email}
          />

          <FormGroup
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Create a strong password"
            errors={action.value?.fieldErrors?.password}
          />

          <button
            type="submit"
            disabled={action.isRunning}
            class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {action.isRunning ? 'Creating account...' : 'Create Account'}
          </button>
        </Form>

        {/* Footer link */}
        <p class="mt-8 text-center text-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link href={PUBLIC_ROUTES.SIGN_IN} class="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
});
