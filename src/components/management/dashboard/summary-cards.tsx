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
  const cards = [
    { label: "Total Balance", value: props.totalBalance, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Income", value: props.totalIncome, color: "text-green-600", bg: "bg-green-50" },
    { label: "Expenses", value: props.totalExpenses, color: "text-red-600", bg: "bg-red-50" },
    { label: "Net Savings", value: props.netSavings, color: props.netSavings >= 0 ? "text-green-600" : "text-red-600", bg: props.netSavings >= 0 ? "bg-green-50" : "bg-red-50" },
  ];

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.label} class={`${card.bg} rounded-lg p-4 dark:bg-gray-800`}>
          <p class="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
          <p class={`text-2xl font-bold ${card.color}`}>
            ${fromCents(card.value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      ))}
      <div class="bg-purple-50 rounded-lg p-4 dark:bg-gray-800 sm:col-span-2 lg:col-span-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">Transactions this period</p>
        <p class="text-2xl font-bold text-purple-600">{props.transactionCount}</p>
      </div>
    </div>
  );
});
