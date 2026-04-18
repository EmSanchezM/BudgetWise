import { component$ } from "@builder.io/qwik";

const features = [
  { icon: "auto_awesome", title: "Automatic Categorization", description: "Every transaction is sorted into the right category using custom logic — no manual tagging." },
  { icon: "savings", title: "Granular Budgets", description: "Set budgets per category and get alerts before you overspend, not after." },
  { icon: "insights", title: "Deep-Dive Analytics", description: "Visualize spending patterns, net worth growth, and cash flow across any time range." },
  { icon: "lock", title: "End-to-End Encryption", description: "Your financial data is encrypted in transit and at rest — private by default." },
  { icon: "language", title: "Multi-Currency", description: "Track finances across borders with built-in multi-currency support." },
  { icon: "description", title: "PDF & CSV Export", description: "Generate tax-ready reports and exports with a single tap." },
];

export const Feature = component$(() => {
  return (
    <section class="max-w-6xl mx-auto px-6" id="feature">
      {/* Header */}
      <div class="mb-12 lg:mb-16 lg:max-w-2xl">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
          Capabilities
        </h2>
        <h3 class="font-headline font-black text-4xl lg:text-6xl tracking-tighter text-primary leading-[0.95] mb-4">
          Every feature, built with intent.
        </h3>
        <p class="text-secondary text-lg leading-relaxed">
          BudgetWise gives you the tools to understand where your money goes — without the ads and clutter of typical finance apps.
        </p>
      </div>

      {/* Feature grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            class="flex items-start gap-5 p-6 bg-surface-container-lowest rounded-2xl editorial-shadow"
          >
            <div class="w-12 h-12 shrink-0 rounded-full bg-surface-container-high flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">{feature.icon}</span>
            </div>
            <div>
              <div class="text-primary font-bold text-sm mb-1">{feature.title}</div>
              <div class="text-on-surface-variant text-xs leading-relaxed">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
