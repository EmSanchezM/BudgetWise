import { component$ } from "@builder.io/qwik";
import { fromCents } from "~/lib/utils";

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  transactionCount: number;
}

export const SummaryCards = component$<SummaryCardsProps>((props) => {
  const balanceFormatted = fromCents(props.totalBalance).toLocaleString("en-US", { minimumFractionDigits: 2 });
  const [whole, decimal] = balanceFormatted.split(".");
  const savingsPercent = props.totalBalance > 0
    ? ((props.netSavings / props.totalBalance) * 100).toFixed(1)
    : "0.0";
  const isPositiveSavings = props.netSavings >= 0;

  return (
    <section class="space-y-6 mb-8">
      {/* Portfolio Value (Editorial Anchor) */}
      <div class="space-y-2">
        <p class="text-on-surface-variant text-[10px] uppercase tracking-[0.1em] font-bold">
          Total Portfolio Value
        </p>
        <div class="flex items-baseline gap-2">
          <h1 class="text-[2.75rem] font-black tracking-tighter leading-none text-primary">
            ${whole}<span class="text-primary/40">.{decimal}</span>
          </h1>
        </div>
        <div class="flex items-center gap-2">
          <div class={[
            "flex items-center px-2 py-0.5 rounded-full",
            isPositiveSavings ? "bg-on-tertiary-container/10" : "bg-error-container/30",
          ].join(" ")}>
            <span
              class={[
                "material-symbols-outlined text-sm",
                isPositiveSavings ? "text-on-tertiary-container" : "text-error",
              ].join(" ")}
              style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            >
              {isPositiveSavings ? "trending_up" : "trending_down"}
            </span>
            <span class={[
              "text-[12px] font-bold ml-1",
              isPositiveSavings ? "text-on-tertiary-container" : "text-error",
            ].join(" ")}>
              {isPositiveSavings ? "+" : ""}{savingsPercent}%
            </span>
          </div>
          <span class="text-on-surface-variant text-[12px]">vs last month</span>
        </div>
      </div>

      {/* Mini stat chips */}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="bg-surface-container-lowest rounded-xl p-4 editorial-shadow">
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Income</p>
          <p class="text-lg font-black tracking-tight text-on-tertiary-container">
            ${fromCents(props.totalIncome).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-4 editorial-shadow">
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Expenses</p>
          <p class="text-lg font-black tracking-tight text-primary">
            ${fromCents(props.totalExpenses).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-4 editorial-shadow">
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Net Savings</p>
          <p class={[
            "text-lg font-black tracking-tight",
            isPositiveSavings ? "text-on-tertiary-container" : "text-error",
          ].join(" ")}>
            ${fromCents(props.netSavings).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-4 editorial-shadow">
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Transactions</p>
          <p class="text-lg font-black tracking-tight text-primary">{props.transactionCount}</p>
        </div>
      </div>
    </section>
  );
});
