import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { fromCents } from "~/lib/utils";

interface RecentTransaction {
  id: number;
  name: string;
  amount: number;
  currency: string;
  isExpense: boolean;
  transactionDate: string | Date;
  account: { name: string };
}

interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

function timeAgo(date: string | Date): string {
  const now = new Date();
  const d = new Date(String(date));
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
}

export const RecentTransactions = component$<RecentTransactionsProps>(({ transactions }) => {
  return (
    <section class="space-y-4">
      <div class="flex justify-between items-end">
        <h3 class="font-bold text-xl tracking-tight">Recent Activity</h3>
        <Link href="/management/transactions" class="text-primary font-bold text-sm">
          See all
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p class="text-on-surface-variant text-sm text-center py-8">No transactions yet.</p>
      ) : (
        <div class="space-y-1">
          {transactions.map((tx) => (
            <a
              key={tx.id}
              href={`/management/transactions/${tx.id}`}
              class="flex items-center p-4 bg-surface-container-low rounded-xl group active:scale-[0.98] transition-all"
            >
              <div class={[
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                tx.isExpense
                  ? "bg-surface-container-highest"
                  : "bg-on-tertiary-container/10",
              ].join(" ")}>
                <span
                  class={[
                    "material-symbols-outlined",
                    tx.isExpense ? "text-primary" : "text-on-tertiary-container",
                  ].join(" ")}
                >
                  {tx.isExpense ? "shopping_bag" : "account_balance"}
                </span>
              </div>
              <div class="ml-4 flex-1 min-w-0">
                <p class="font-bold text-[15px] tracking-tight truncate">{tx.name}</p>
                <p class="text-on-surface-variant text-[12px]">
                  {tx.account.name} &middot; {timeAgo(tx.transactionDate)}
                </p>
              </div>
              <div class="text-right ml-3">
                <p class={[
                  "font-black",
                  tx.isExpense ? "text-primary" : "text-on-tertiary-container",
                ].join(" ")}>
                  {tx.isExpense ? "-" : "+"}${fromCents(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
});
