import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, zod$ } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { MANAGEMENT_ROUTES, PUBLIC_ROUTES } from "~/lib/constants";
import { comparePasswordAndHash } from "~/lib/utils";
import { SignInSchemaValidation } from "~/lib/validation-schemes";
import { createSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "~/lib/auth";
import { FormGroup } from "~/components/ui";

export const useSignIn = routeAction$(async (data, { fail, redirect, cookie, env }) => {
  const user = await orm.user.findUnique({ where: { email: data.email } });

  if (!user) return fail(500, { message: 'Credentials not valid' });

  const validPassword = await comparePasswordAndHash(data.password, user.password);

  if (!validPassword) return fail(500, { message: 'Credentials not valid' });

  const token = await createSession(user.id);
  const isProduction = env.get("NODE_ENV") === "production";
  cookie.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  throw redirect(302, MANAGEMENT_ROUTES.DASHBOARD);
}, zod$(SignInSchemaValidation));

export default component$(() => {
  const action = useSignIn();

  return (
    <section class="flex items-center justify-center min-h-[calc(100vh-12rem)] px-6">
      <div class="w-full max-w-md">
        {/* Header */}
        <div class="mb-10">
          <div class="inline-block px-3 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
            Welcome Back
          </div>
          <h1 class="font-headline font-black text-4xl tracking-tighter text-primary leading-[0.95] mb-3">
            Sign in to your account
          </h1>
          <p class="text-secondary text-sm leading-relaxed">
            Continue curating your financial narrative.
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
            placeholder="Enter your password"
            errors={action.value?.fieldErrors?.password}
          />

          <button
            type="submit"
            disabled={action.isRunning}
            class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {action.isRunning ? 'Signing in...' : 'Sign in'}
          </button>
        </Form>

        {/* Footer link */}
        <p class="mt-8 text-center text-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link href={PUBLIC_ROUTES.SIGN_UP} class="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
});
