import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { getDashboardData } from "~/lib/server/dashboard-queries";
import {
  SummaryCards,
  SpendingChart,
  RecentTransactions,
  BudgetProgress,
  PeriodSelector,
} from "~/components/management/dashboard";

function getDateRange(period: string): { start: Date; end: Date } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  switch (period) {
    case "last-month": {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      return { start, end };
    }
    case "this-quarter": {
      const quarterStart = Math.floor(month / 3) * 3;
      const start = new Date(year, quarterStart, 1);
      const end = new Date(year, quarterStart + 3, 0, 23, 59, 59);
      return { start, end };
    }
    case "this-year": {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      return { start, end };
    }
    default: {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      return { start, end };
    }
  }
}

export const useDashboard = routeLoader$(async ({ sharedMap, url }) => {
  const user = getAuthenticatedUser(sharedMap);
  const period = url.searchParams.get("period") || "this-month";
  const { start, end } = getDateRange(period);
  const data = await getDashboardData(user.id, start, end);
  return { ...data, period };
});

export default component$(() => {
  const data = useDashboard();

  return (
    <div class="space-y-8">
      <PeriodSelector currentPeriod={data.value.period} />

      <SummaryCards
        totalBalance={data.value.totalBalance}
        totalIncome={data.value.totalIncome}
        totalExpenses={data.value.totalExpenses}
        netSavings={data.value.netSavings}
        transactionCount={data.value.transactionCount}
      />

      <div class="grid grid-cols-1 gap-4">
        <SpendingChart data={data.value.spendingByCategory} />
        <BudgetProgress budgets={data.value.budgetProgress} />
      </div>

      <RecentTransactions transactions={data.value.recentTransactions as any} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Dashboard",
  meta: [
    {
      name: "description",
      content: "Your financial overview - track expenses, income, and budgets",
    },
  ],
};
