import { component$ } from "@builder.io/qwik";
import { fromCents } from "~/lib/utils";

interface BudgetItem {
  id: number;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  currency: string;
  percentage: number;
  categoryName: string;
  categoryColor: string;
}

interface BudgetProgressProps {
  budgets: BudgetItem[];
}

export const BudgetProgress = component$<BudgetProgressProps>(({ budgets }) => {
  const alertCount = budgets.filter(b => b.percentage >= 80).length;

  return (
    <div class="bg-primary text-on-primary p-6 rounded-[2rem] editorial-shadow space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-lg tracking-tight">Active Budgets</h3>
        {alertCount > 0 && (
          <span class="text-[12px] font-bold uppercase tracking-widest opacity-60">
            {alertCount} {alertCount === 1 ? 'Alarm' : 'Alarms'}
          </span>
        )}
      </div>

      {budgets.length === 0 ? (
        <p class="text-white/60 text-sm text-center py-4">No active budgets.</p>
      ) : (
        <div class="space-y-5">
          {budgets.slice(0, 4).map((budget) => {
            const barWidth = Math.min(budget.percentage, 100);
            const isOverBudget = budget.percentage >= 100;

            return (
              <div key={budget.id} class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="opacity-80">{budget.name}</span>
                  <span class={[
                    "font-bold",
                    isOverBudget ? "text-error-container" : "",
                  ].join(" ")}>
                    ${fromCents(budget.spentAmount).toLocaleString()} / ${fromCents(budget.budgetAmount).toLocaleString()}
                  </span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class={[
                      "h-full rounded-full transition-all",
                      isOverBudget ? "bg-error" : "bg-secondary-fixed-dim",
                    ].join(" ")}
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
