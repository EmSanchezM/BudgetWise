import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with personal finance.",
    features: ["Track income & expenses", "Custom categories", "Multi-currency", "Community support"],
  },
  {
    name: "Standard",
    price: "$9",
    period: "/month",
    description: "For the serious curator who demands more.",
    features: ["Everything in Free", "Budget automation", "Analytics dashboard", "Priority support"],
    featured: true,
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "Full editorial suite for financial mastery.",
    features: ["Everything in Standard", "Advanced reports", "API access", "Dedicated advisor"],
  },
];

export const Pricing = component$(() => {
  return (
    <section class="px-6 max-w-4xl mx-auto" id="pricing">
      {/* Header */}
      <div class="text-center mb-12">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
          Pricing
        </h2>
        <h3 class="font-headline font-black text-4xl tracking-tighter text-primary leading-[0.95] mb-4">
          Choose your plan
        </h3>
        <p class="text-secondary text-base leading-relaxed max-w-md mx-auto">
          Select the tier that matches your ambition. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Plans grid */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            class={[
              "rounded-[2rem] p-8 flex flex-col",
              plan.featured
                ? "bg-primary text-white editorial-shadow"
                : "bg-surface-container-lowest editorial-shadow",
            ].join(" ")}
          >
            <div class="mb-6">
              <div class={[
                "text-[10px] font-bold uppercase tracking-widest mb-3",
                plan.featured ? "text-white/60" : "text-slate-400",
              ].join(" ")}>
                {plan.name}
              </div>
              <div class="flex items-baseline gap-1">
                <span class={[
                  "text-4xl font-black tracking-tighter",
                  plan.featured ? "text-white" : "text-primary",
                ].join(" ")}>
                  {plan.price}
                </span>
                <span class={[
                  "text-sm font-medium",
                  plan.featured ? "text-white/60" : "text-on-surface-variant",
                ].join(" ")}>
                  {plan.period}
                </span>
              </div>
              <p class={[
                "text-sm mt-2 leading-relaxed",
                plan.featured ? "text-white/70" : "text-secondary",
              ].join(" ")}>
                {plan.description}
              </p>
            </div>

            <ul class="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  class="flex items-center gap-2.5 text-sm"
                >
                  <span
                    class={[
                      "material-symbols-outlined text-[18px]",
                      plan.featured ? "text-primary-fixed" : "text-primary",
                    ].join(" ")}
                    style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                  >
                    check_circle
                  </span>
                  <span class={plan.featured ? "text-white/90" : "text-on-surface-variant"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={PUBLIC_ROUTES.SIGN_UP}
              class={[
                "block w-full py-3.5 rounded-xl font-bold text-center text-sm active:scale-95 transition-transform",
                plan.featured
                  ? "bg-white text-primary"
                  : "bg-surface-container-high text-primary",
              ].join(" ")}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
});
