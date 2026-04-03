import { component$ } from "@builder.io/qwik";
import { Link, Form, useLocation } from "@builder.io/qwik-city";
import { useSignIn } from "~/routes/plugin@auth";
import { MANAGEMENT_ROUTES, PUBLIC_ROUTES } from "~/lib/constants";
import { FormGroup } from "~/components/ui";

export default component$(() => {
  const signIn = useSignIn();
  const location = useLocation();
  const errorParam = location.url.searchParams.get("error");

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
        {errorParam && (
          <div class="mb-6 p-4 bg-error-container/30 rounded-xl">
            <p class="text-error text-sm font-medium">Credentials not valid</p>
          </div>
        )}

        {/* Form */}
        <Form action={signIn}>
          <input type="hidden" name="providerId" value="credentials" />
          <input type="hidden" name="options.redirectTo" value={MANAGEMENT_ROUTES.DASHBOARD} />

          <div class="space-y-5">
            <FormGroup
              type="email"
              label="Email address"
              id="email"
              name="options.email"
              placeholder="you@example.com"
            />

            <FormGroup
              type="password"
              label="Password"
              id="password"
              name="options.password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={signIn.isRunning}
              class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signIn.isRunning ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
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
