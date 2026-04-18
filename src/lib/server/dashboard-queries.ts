import orm from "~/lib/orm";

export async function getDashboardData(userId: string, startDate: Date, endDate: Date) {
  // Total balance across all accounts
  const totalBalance = await orm.account.aggregate({
    where: { userId, deletedAt: null },
    _sum: { balance: true },
  });

  // Income this period
  const income = await orm.transaction.aggregate({
    where: {
      userId,
      isExpense: false,
      transactionDate: { gte: startDate, lte: endDate },
      deletedAt: null,
    },
    _sum: { amount: true },
    _count: true,
  });

  // Expenses this period
  const expenses = await orm.transaction.aggregate({
    where: {
      userId,
      isExpense: true,
      transactionDate: { gte: startDate, lte: endDate },
      deletedAt: null,
    },
    _sum: { amount: true },
    _count: true,
  });

  // Spending by category this period
  const spendingByCategory = await orm.transaction.groupBy({
    by: ["categoryId"],
    where: {
      userId,
      isExpense: true,
      transactionDate: { gte: startDate, lte: endDate },
      deletedAt: null,
      categoryId: { not: null },
    },
    _sum: { amount: true },
  });

  // Get category details for the spending data
  const categoryIds = spendingByCategory
    .map((s) => s.categoryId)
    .filter((id): id is number => id !== null);

  const categories = categoryIds.length > 0
    ? await orm.category.findMany({
        where: { id: { in: categoryIds } },
        select: { id: true, name: true, color: true },
      })
    : [];

  const spendingWithCategories = spendingByCategory.map((s) => {
    const cat = categories.find((c) => c.id === s.categoryId);
    return {
      categoryName: cat?.name ?? "Uncategorized",
      color: cat?.color ?? "#9ca3af",
      amount: s._sum.amount ?? 0,
    };
  });

  // Recent transactions
  const recentTransactions = await orm.transaction.findMany({
    where: { userId, deletedAt: null },
    orderBy: { transactionDate: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      amount: true,
      currency: true,
      isExpense: true,
      transactionDate: true,
      account: { select: { name: true } },
    },
  });

  // Active budgets with spending progress
  const now = new Date();
  const activeBudgets = await orm.budget.findMany({
    where: {
      userId,
      deletedAt: null,
      initDate: { lte: now },
      finishDate: { gte: now },
    },
    select: {
      id: true,
      name: true,
      amount: true,
      currency: true,
      initDate: true,
      finishDate: true,
      categoryId: true,
      category: { select: { name: true, color: true } },
    },
  });

  // For each active budget, calculate spending in that category during budget period
  const budgetProgress = await Promise.all(
    activeBudgets.map(async (budget) => {
      const spent = await orm.transaction.aggregate({
        where: {
          userId,
          isExpense: true,
          categoryId: budget.categoryId,
          transactionDate: { gte: budget.initDate, lte: budget.finishDate },
          deletedAt: null,
        },
        _sum: { amount: true },
      });
      const spentAmount = spent._sum.amount ?? 0;
      const percentage = budget.amount > 0 ? Math.round((spentAmount / budget.amount) * 100) : 0;
      return {
        id: budget.id,
        name: budget.name,
        budgetAmount: budget.amount,
        spentAmount,
        currency: budget.currency,
        percentage,
        categoryName: budget.category.name,
        categoryColor: budget.category.color,
      };
    })
  );

  return {
    totalBalance: totalBalance._sum.balance ?? 0,
    totalIncome: income._sum.amount ?? 0,
    totalExpenses: expenses._sum.amount ?? 0,
    netSavings: (income._sum.amount ?? 0) - (expenses._sum.amount ?? 0),
    transactionCount: (income._count ?? 0) + (expenses._count ?? 0),
    spendingByCategory: spendingWithCategories,
    recentTransactions,
    budgetProgress,
  };
}
