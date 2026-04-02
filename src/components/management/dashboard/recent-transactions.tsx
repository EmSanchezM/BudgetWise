import { component$ } from "@builder.io/qwik";
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

export const RecentTransactions = component$<RecentTransactionsProps>(({ transactions }) => {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p class="text-gray-500 dark:text-gray-400 text-center py-4">No transactions yet.</p>
      ) : (
        <div class="space-y-3">
          {transactions.map((tx) => (
            <a key={tx.id} href={`/management/transactions/${tx.id}`} class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{tx.name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {tx.account.name} · {new Date(String(tx.transactionDate)).toLocaleDateString()}
                </p>
              </div>
              <span class={`font-semibold ${tx.isExpense ? "text-red-600" : "text-green-600"}`}>
                {tx.isExpense ? "-" : "+"}${fromCents(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
});
