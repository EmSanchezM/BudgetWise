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
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Active Budgets</h3>
      {budgets.length === 0 ? (
        <p class="text-gray-500 dark:text-gray-400 text-center py-4">No active budgets.</p>
      ) : (
        <div class="space-y-4">
          {budgets.map((budget) => {
            const barColor = budget.percentage >= 100 ? "bg-red-500" : budget.percentage >= 80 ? "bg-yellow-500" : "bg-green-500";
            const barWidth = Math.min(budget.percentage, 100);
            return (
              <div key={budget.id}>
                <div class="flex justify-between mb-1">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" style={{ backgroundColor: budget.categoryColor }}></span>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{budget.name}</span>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    ${fromCents(budget.spentAmount).toLocaleString()} / ${fromCents(budget.budgetAmount).toLocaleString()}
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class={`${barColor} h-2.5 rounded-full transition-all`} style={{ width: `${barWidth}%` }}></div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{budget.percentage}% used · {budget.categoryName}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
