import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";

export const About = component$(() => {
  return (
    <>
      {/* Hero Section */}
      <section class="px-6 mb-16">
        <div class="inline-block px-3 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
          The Financial Curator
        </div>
        <h1 class="font-headline font-black text-5xl tracking-tighter text-primary leading-[0.95] mb-8">
          Want anything to be easy with BudgetWise
        </h1>
        <p class="text-secondary text-lg leading-relaxed mb-8 max-w-[85%]">
          Elevate your capital management with editorial-grade insights and uncompromising data integrity.
        </p>
        <div class="flex gap-4">
          <Link
            href={PUBLIC_ROUTES.SIGN_UP}
            class="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold transition-transform active:scale-95"
          >
            Start Curation
          </Link>
        </div>
      </section>

      {/* Asymmetric Asset Display */}
      <section class="mb-20">
        <div class="relative overflow-hidden pl-6">
          <div class="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {/* Portfolio Card */}
            <div class="min-w-[280px] snap-center bg-surface-container-lowest editorial-shadow rounded-[2rem] p-8">
              <div class="flex justify-between items-start mb-12">
                <span class="material-symbols-outlined text-surface-tint p-2 bg-surface-container-low rounded-xl">
                  account_balance
                </span>
                <span class="text-error font-bold text-xs">+2.4%</span>
              </div>
              <div class="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                Total Assets
              </div>
              <div class="text-3xl font-black tracking-tighter text-primary">
                $842,000.00
              </div>
            </div>

            {/* Real-time Analytics Card */}
            <div class="min-w-[280px] snap-center bg-primary text-white editorial-shadow rounded-[2rem] p-8">
              <div class="flex justify-between items-start mb-12">
                <span class="material-symbols-outlined text-primary-fixed p-2 bg-white/10 rounded-xl">
                  monitoring
                </span>
                <div class="flex gap-1">
                  <div class="w-1 h-4 bg-primary-fixed-dim rounded-full"></div>
                  <div class="w-1 h-6 bg-primary-fixed rounded-full"></div>
                  <div class="w-1 h-3 bg-primary-fixed-dim rounded-full"></div>
                </div>
              </div>
              <div class="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                Real-time Analytics
              </div>
              <div class="text-xl font-bold leading-tight">
                Live Market Intelligence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Value Propositions */}
      <section class="px-6 grid grid-cols-2 gap-4 mb-20">
        {/* Large Feature */}
        <div class="col-span-2 bg-surface-container-low rounded-[2rem] p-8 relative overflow-hidden">
          <h3 class="text-2xl font-black tracking-tighter text-primary mb-4 leading-none">
            Bank-Grade Security
          </h3>
          <p class="text-secondary text-sm leading-relaxed mb-6">
            Your data is encased in military-grade encryption protocols, ensuring absolute privacy.
          </p>
          <div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            Learn More
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
          <div class="absolute -right-4 -bottom-4 opacity-10">
            <span
              class="material-symbols-outlined text-[120px]"
              style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            >
              verified_user
            </span>
          </div>
        </div>

        {/* Small Feature 1 */}
        <div class="bg-surface-container-lowest editorial-shadow rounded-[2rem] p-6 flex flex-col justify-between min-h-[160px]">
          <span
            class="material-symbols-outlined text-on-tertiary-container"
            style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          >
            auto_awesome
          </span>
          <div class="mt-8">
            <div class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">
              Automation
            </div>
            <div class="text-sm font-bold text-primary">Smart Budgets</div>
          </div>
        </div>

        {/* Small Feature 2 */}
        <div class="bg-surface-container-lowest editorial-shadow rounded-[2rem] p-6 flex flex-col justify-between min-h-[160px]">
          <span class="material-symbols-outlined text-on-primary-container">
            history_edu
          </span>
          <div class="mt-8">
            <div class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">
              Reporting
            </div>
            <div class="text-sm font-bold text-primary">Editorial View</div>
          </div>
        </div>
      </section>

      {/* Full Width Image / Editorial Break */}
      <section class="mb-20 px-6">
        <div class="w-full h-80 rounded-[2.5rem] overflow-hidden relative bg-primary">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 flex flex-col justify-end p-8">
            <div class="text-white text-3xl font-black tracking-tighter leading-none mb-2">
              Curate your legacy.
            </div>
            <p class="text-white/70 text-sm">
              Professional tools for the modern investor.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Insights Section */}
      <section class="px-6 mb-24">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
          Strategic Insights
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-6 bg-white rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">pie_chart</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Wealth Allocation</div>
                <div class="text-slate-400 text-xs">Dynamic Rebalancing</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div class="flex items-center justify-between p-6 bg-white rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">receipt_long</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Tax Efficiency</div>
                <div class="text-slate-400 text-xs">Automated Harvesting</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div class="flex items-center justify-between p-6 bg-white rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Growth Tracking</div>
                <div class="text-slate-400 text-xs">Compound Visualization</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </section>
    </>
  );
});
