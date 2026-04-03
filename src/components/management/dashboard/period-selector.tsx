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
    <div class="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
      {periods.map((p) => (
        <a
          key={p.value}
          href={`?period=${p.value}`}
          class={[
            "px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all active:scale-95",
            currentPeriod === p.value
              ? "bg-gradient-to-br from-primary to-primary-container text-white"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high",
          ].join(" ")}
        >
          {p.label}
        </a>
      ))}
    </div>
  );
});
