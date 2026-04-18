import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";

export const About = component$(() => {
  return (
    <div class="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section class="px-6 mb-16 lg:mb-28 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
        <div class="lg:col-span-7">
          <div class="inline-block px-3 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
            Personal Finance, Reimagined
          </div>
          <h1 class="font-headline font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter text-primary leading-[0.95] mb-8">
            Clarity over chaos for your money.
          </h1>
          <p class="text-secondary text-lg leading-relaxed mb-8 max-w-xl">
            BudgetWise automatically categorizes every transaction, tracks your budgets, and turns raw data into insights you can act on — without the ads or clutter of typical finance apps.
          </p>
          <div class="flex gap-4">
            <Link
              href={PUBLIC_ROUTES.SIGN_UP}
              class="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold transition-transform active:scale-95"
            >
              Start Tracking Free
            </Link>
          </div>
        </div>

        {/* Hero Visual Preview (desktop only) */}
        <div class="hidden lg:flex lg:col-span-5 justify-center">
          <div class="flex flex-col gap-4 w-full max-w-md">
            {/* Net Worth card */}
            <div class="bg-surface-container-lowest editorial-shadow rounded-[2rem] p-8">
              <div class="flex justify-between items-start mb-10">
                <span class="material-symbols-outlined text-surface-tint p-2 bg-surface-container-low rounded-xl">
                  account_balance_wallet
                </span>
                <span class="text-primary font-bold text-xs bg-secondary-container/50 px-2 py-1 rounded-full">
                  +2.4%
                </span>
              </div>
              <div class="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                Net Worth This Month
              </div>
              <div class="text-4xl font-black tracking-tighter text-primary mb-6">
                $42,580.00
              </div>
              <div class="grid grid-cols-3 gap-2 pt-4 border-t border-outline-variant/30">
                <div>
                  <div class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Income</div>
                  <div class="text-sm font-bold text-primary">$6.2k</div>
                </div>
                <div>
                  <div class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Spent</div>
                  <div class="text-sm font-bold text-primary">$3.8k</div>
                </div>
                <div>
                  <div class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Saved</div>
                  <div class="text-sm font-bold text-primary">$2.4k</div>
                </div>
              </div>
            </div>

            {/* Auto-categorization card */}
            <div class="self-end w-[85%] bg-primary text-white editorial-shadow rounded-2xl p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-primary-fixed text-[18px]">auto_awesome</span>
                <div class="text-[9px] font-bold uppercase tracking-widest opacity-60">
                  Auto-Categorized
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-sm font-bold leading-tight">
                    Uber Eats → Food &amp; Dining
                  </div>
                  <div class="text-white/50 text-[11px] mt-1">Just now</div>
                </div>
                <div class="text-sm font-bold text-primary-fixed">−$24.80</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/Tablet Preview Cards Carousel */}
      <section class="mb-20 lg:hidden">
        <div class="relative overflow-hidden pl-6">
          <div class="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            <div class="min-w-[280px] snap-center bg-surface-container-lowest editorial-shadow rounded-[2rem] p-8">
              <div class="flex justify-between items-start mb-12">
                <span class="material-symbols-outlined text-surface-tint p-2 bg-surface-container-low rounded-xl">
                  account_balance_wallet
                </span>
                <span class="text-primary font-bold text-xs">+2.4%</span>
              </div>
              <div class="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                Net Worth
              </div>
              <div class="text-3xl font-black tracking-tighter text-primary">
                $42,580.00
              </div>
            </div>

            <div class="min-w-[280px] snap-center bg-primary text-white editorial-shadow rounded-[2rem] p-8">
              <div class="flex justify-between items-start mb-12">
                <span class="material-symbols-outlined text-primary-fixed p-2 bg-white/10 rounded-xl">
                  auto_awesome
                </span>
                <div class="flex gap-1">
                  <div class="w-1 h-4 bg-primary-fixed-dim rounded-full"></div>
                  <div class="w-1 h-6 bg-primary-fixed rounded-full"></div>
                  <div class="w-1 h-3 bg-primary-fixed-dim rounded-full"></div>
                </div>
              </div>
              <div class="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                Auto-Categorization
              </div>
              <div class="text-xl font-bold leading-tight">
                Every transaction, sorted.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Value Propositions */}
      <section class="px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 lg:mb-28">
        {/* Large Feature */}
        <div class="col-span-2 lg:col-span-4 lg:row-span-1 bg-surface-container-low rounded-[2rem] p-8 lg:p-12 relative overflow-hidden">
          <div class="lg:max-w-lg">
            <h3 class="text-2xl lg:text-4xl font-black tracking-tighter text-primary mb-4 leading-none">
              End-to-End Encryption
            </h3>
            <p class="text-secondary text-sm lg:text-base leading-relaxed mb-6">
              Every transaction, balance, and category is encrypted in transit and at rest. Your financial data stays private — always.
            </p>
            <Link
              href={PUBLIC_ROUTES.SIGN_UP}
              class="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest"
            >
              Learn More
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div class="absolute -right-4 -bottom-4 lg:-right-10 lg:-bottom-10 opacity-10">
            <span
              class="material-symbols-outlined text-[120px] lg:text-[240px]"
              style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            >
              verified_user
            </span>
          </div>
        </div>

        {/* Small Feature 1 */}
        <div class="lg:col-span-2 bg-surface-container-lowest editorial-shadow rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between min-h-[160px] lg:min-h-[220px]">
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
            <div class="text-sm lg:text-lg font-bold text-primary mb-1">Smart Budgets</div>
            <p class="hidden lg:block text-xs text-on-surface-variant leading-relaxed">
              Granular budgets per category with automatic spending alerts.
            </p>
          </div>
        </div>

        {/* Small Feature 2 */}
        <div class="lg:col-span-2 bg-surface-container-lowest editorial-shadow rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between min-h-[160px] lg:min-h-[220px]">
          <span class="material-symbols-outlined text-on-primary-container">
            insights
          </span>
          <div class="mt-8">
            <div class="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">
              Analytics
            </div>
            <div class="text-sm lg:text-lg font-bold text-primary mb-1">Deep-Dive Reports</div>
            <p class="hidden lg:block text-xs text-on-surface-variant leading-relaxed">
              Visualize spending patterns and net worth growth over any time range.
            </p>
          </div>
        </div>
      </section>

      {/* Full Width Image / Editorial Break */}
      <section class="mb-20 lg:mb-28 px-6">
        <div class="w-full h-80 lg:h-[28rem] rounded-[2.5rem] overflow-hidden relative bg-primary">
          <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 flex flex-col justify-end p-8 lg:p-16">
            <div class="text-white text-3xl lg:text-6xl font-black tracking-tighter leading-none mb-2 lg:mb-4 max-w-2xl">
              Your money, finally understood.
            </div>
            <p class="text-white/70 text-sm lg:text-lg max-w-xl">
              Built for people who want real insight into where their money goes — not another cluttered feed.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section class="px-6 mb-24">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 lg:text-center">
          Core Capabilities
        </h2>
        <div class="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
          <div class="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">category</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Spending Categories</div>
                <div class="text-slate-400 text-xs">Auto-sorted transactions</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div class="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">receipt_long</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Export Ready</div>
                <div class="text-slate-400 text-xs">PDF &amp; CSV reports</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>

          <div class="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl editorial-shadow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <div>
                <div class="text-primary font-bold text-sm">Net Worth Growth</div>
                <div class="text-slate-400 text-xs">Long-term visualization</div>
              </div>
            </div>
            <span class="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
});
