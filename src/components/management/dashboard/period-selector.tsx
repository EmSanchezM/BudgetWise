import { component$ } from "@builder.io/qwik";

interface PeriodSelectorProps {
  currentPeriod: string;
}

export const PeriodSelector = component$<PeriodSelectorProps>(({ currentPeriod }) => {
  const periods = [
    { label: "This Month", value: "this-month" },
    { label: "Last Month", value: "last-month" },
    { label: "This Quarter", value: "this-quarter" },
    { label: "This Year", value: "this-year" },
  ];

  return (
    <div class="flex gap-2 mb-6 flex-wrap">
      {periods.map((p) => (
        <a
          key={p.value}
          href={`?period=${p.value}`}
          class={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            currentPeriod === p.value
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {p.label}
        </a>
      ))}
    </div>
  );
});
