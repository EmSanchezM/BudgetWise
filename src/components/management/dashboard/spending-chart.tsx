import { component$ } from "@builder.io/qwik";
import { fromCents } from "~/lib/utils";

interface SpendingItem {
  categoryName: string;
  color: string;
  amount: number;
}

interface SpendingChartProps {
  data: SpendingItem[];
}

const defaultColors = ["#0c1427", "#d0e1fb", "#eceef0", "#505f76", "#ddc39d"];

export const SpendingChart = component$<SpendingChartProps>(({ data }) => {
  if (data.length === 0) {
    return (
      <div class="bg-surface-container-lowest p-6 rounded-[2rem] editorial-shadow">
        <h3 class="font-bold text-lg tracking-tight mb-4">Spending Flow</h3>
        <p class="text-on-surface-variant text-sm text-center py-8">No expense data for this period.</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.amount, 0);

  // Build conic gradient stops
  let cumulative = 0;
  const gradientStops = data.map((item, i) => {
    const percent = total > 0 ? (item.amount / total) * 100 : 0;
    const start = cumulative;
    cumulative += percent;
    const color = item.color || defaultColors[i % defaultColors.length];
    return `${color} ${start}% ${cumulative}%`;
  });

  const conicGradient = `conic-gradient(${gradientStops.join(", ")})`;

  return (
    <div class="bg-surface-container-lowest p-6 rounded-[2rem] editorial-shadow space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-lg tracking-tight">Spending Flow</h3>
        <span class="material-symbols-outlined text-on-surface-variant">data_exploration</span>
      </div>
      <div class="flex items-center justify-between">
        {/* Donut Chart */}
        <div class="relative w-24 h-24 flex items-center justify-center shrink-0">
          <div
            class="absolute inset-0 rounded-full"
            style={{ background: conicGradient }}
          ></div>
          <div class="absolute inset-2 bg-surface-container-lowest rounded-full"></div>
        </div>

        {/* Legend */}
        <div class="flex-1 ml-8 space-y-3">
          {data.slice(0, 5).map((item, i) => (
            <div key={item.categoryName} class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color || defaultColors[i % defaultColors.length] }}
                ></div>
                <span class="text-sm font-medium">{item.categoryName}</span>
              </div>
              <span class="text-sm font-bold">
                ${fromCents(item.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
