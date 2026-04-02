import { component$ } from "@builder.io/qwik";

const features = [
  { icon: "touch_app", title: "Intuitive Interface", description: "Designed for clarity and speed. Every interaction feels intentional." },
  { icon: "trending_up", title: "Income & Expense Tracking", description: "Monitor every flow of capital with editorial-grade precision." },
  { icon: "category", title: "Custom Categories", description: "Organize your finances with a taxonomy that reflects your life." },
  { icon: "language", title: "Worldwide Currencies", description: "Operate across borders with multi-currency intelligence." },
  { icon: "support_agent", title: "24/7 Support", description: "Our team is always available to assist your financial journey." },
];

export const Feature = component$(() => {
  return (
    <section class="px-6 max-w-3xl mx-auto" id="feature">
      {/* Header */}
      <div class="mb-12">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
          Capabilities
        </h2>
        <h3 class="font-headline font-black text-4xl tracking-tighter text-primary leading-[0.95] mb-4">
          Features built for the modern curator
        </h3>
        <p class="text-secondary text-lg leading-relaxed max-w-lg">
          Every feature is designed with intention, providing you the tools to curate your financial narrative.
        </p>
      </div>

      {/* Feature list */}
      <div class="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            class="flex items-center gap-5 p-6 bg-surface-container-lowest rounded-2xl editorial-shadow"
          >
            <div class="w-12 h-12 shrink-0 rounded-full bg-surface-container-high flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">{feature.icon}</span>
            </div>
            <div>
              <div class="text-primary font-bold text-sm mb-0.5">{feature.title}</div>
              <div class="text-on-surface-variant text-xs leading-relaxed">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
