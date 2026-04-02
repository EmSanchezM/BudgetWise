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

export const SpendingChart = component$<SpendingChartProps>(({ data }) => {
  if (data.length === 0) {
    return (
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Spending by Category</h3>
        <p class="text-gray-500 dark:text-gray-400 text-center py-8">No expense data for this period.</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.amount, 0);
  let cumulativePercent = 0;

  // Generate SVG pie chart paths
  const slices = data.map((item) => {
    const percent = total > 0 ? item.amount / total : 0;
    const startAngle = cumulativePercent * 360;
    cumulativePercent += percent;
    const endAngle = cumulativePercent * 360;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArc = percent > 0.5 ? 1 : 0;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const path = data.length === 1
      ? `M 50 10 A 40 40 0 1 1 49.99 10 Z`
      : `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...item, path, percent };
  });

  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Spending by Category</h3>
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 100 100" class="w-48 h-48">
          {slices.map((slice) => (
            <path key={slice.categoryName} d={slice.path} fill={slice.color} stroke="white" stroke-width="0.5" />
          ))}
        </svg>
        <div class="space-y-2 flex-1">
          {slices.map((slice) => (
            <div key={slice.categoryName} class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: slice.color }}></span>
                <span class="text-sm text-gray-700 dark:text-gray-300">{slice.categoryName}</span>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                ${fromCents(slice.amount).toLocaleString()} ({Math.round(slice.percent * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
