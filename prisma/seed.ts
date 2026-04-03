import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { v7 as uuidv7 } from "uuid";

const prisma = new PrismaClient();
const toCents = (amount: number) => Math.round(amount * 100);

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleaned existing data");

  const password = await argon2.hash("Test1234!");

  const user1 = await prisma.user.create({
    data: {
      id: uuidv7(),
      firstName: "Elvin",
      lastName: "Sanchez",
      email: "elvin@test.com",
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: uuidv7(),
      firstName: "Maria",
      lastName: "Lopez",
      email: "maria@test.com",
      password,
    },
  });

  console.log(`Created users: ${user1.email}, ${user2.email}`);

  const checking = await prisma.account.create({
    data: {
      name: "Cuenta Corriente BAC",
      numberAccount: "1234-5678-9012",
      type: "checking",
      currency: "USD",
      balance: toCents(5200.50),
      userId: user1.id,
    },
  });

  const savings = await prisma.account.create({
    data: {
      name: "Ahorro Banpro",
      numberAccount: "9876-5432-1098",
      type: "savings",
      currency: "USD",
      balance: toCents(12000),
      userId: user1.id,
    },
  });

  const mariaChecking = await prisma.account.create({
    data: {
      name: "Cuenta Personal",
      numberAccount: "5555-4444-3333",
      type: "checking",
      currency: "USD",
      balance: toCents(3400),
      userId: user2.id,
    },
  });

  console.log("Created accounts");

  const food = await prisma.category.create({
    data: { name: "Alimentacion", description: "Gastos en comida y supermercado", color: "#ef4444", userId: user1.id },
  });

  const transport = await prisma.category.create({
    data: { name: "Transporte", description: "Gasolina, uber, bus", color: "#3b82f6", userId: user1.id },
  });

  const entertainment = await prisma.category.create({
    data: { name: "Entretenimiento", description: "Cine, streaming, salidas", color: "#8b5cf6", userId: user1.id },
  });

  const salaryCategory = await prisma.category.create({
    data: { name: "Salario", description: "Ingresos mensuales", color: "#22c55e", userId: user1.id },
  });

  const mariaServicios = await prisma.category.create({
    data: { name: "Servicios", description: "Luz, agua, internet", color: "#f59e0b", userId: user2.id },
  });

  await prisma.category.create({
    data: { name: "Compras", description: "Ropa, electronica, hogar", color: "#ec4899", userId: user2.id },
  });

  console.log("Created categories");

  await prisma.budget.create({
    data: { name: "Presupuesto Comida Abril", initDate: new Date("2026-04-01"), finishDate: new Date("2026-04-30"), amount: toCents(500), currency: "USD", categoryId: food.id, userId: user1.id },
  });

  await prisma.budget.create({
    data: { name: "Presupuesto Transporte Abril", initDate: new Date("2026-04-01"), finishDate: new Date("2026-04-30"), amount: toCents(200), currency: "USD", categoryId: transport.id, userId: user1.id },
  });

  await prisma.budget.create({
    data: { name: "Entretenimiento Q2", initDate: new Date("2026-04-01"), finishDate: new Date("2026-06-30"), amount: toCents(300), currency: "USD", categoryId: entertainment.id, userId: user1.id },
  });

  await prisma.budget.create({
    data: { name: "Servicios Abril", initDate: new Date("2026-04-01"), finishDate: new Date("2026-04-30"), amount: toCents(150), currency: "USD", categoryId: mariaServicios.id, userId: user2.id },
  });

  console.log("Created budgets");

  const txs = [
    { name: "Salario Marzo", transactionDate: new Date("2026-03-30"), amount: toCents(3500), currency: "USD", description: "Pago quincenal", isExpense: false, accountId: checking.id, userId: user1.id, categoryId: salaryCategory.id },
    { name: "Supermercado La Colonia", transactionDate: new Date("2026-04-01"), amount: toCents(85.50), currency: "USD", description: "Compras semanales", isExpense: true, accountId: checking.id, userId: user1.id, categoryId: food.id },
    { name: "Gasolina", transactionDate: new Date("2026-04-02"), amount: toCents(45), currency: "USD", description: "Tanque lleno", isExpense: true, accountId: checking.id, userId: user1.id, categoryId: transport.id },
    { name: "Netflix", transactionDate: new Date("2026-04-01"), amount: toCents(15.99), currency: "USD", description: "Suscripcion mensual", isExpense: true, accountId: checking.id, userId: user1.id, categoryId: entertainment.id },
    { name: "Freelance proyecto web", transactionDate: new Date("2026-04-01"), amount: toCents(800), currency: "USD", description: "Pago cliente XYZ", isExpense: false, accountId: savings.id, userId: user1.id },
    { name: "Restaurante El Cafetin", transactionDate: new Date("2026-04-02"), amount: toCents(32), currency: "USD", description: "Almuerzo con equipo", isExpense: true, accountId: checking.id, userId: user1.id, categoryId: food.id },
    { name: "Uber semanal", transactionDate: new Date("2026-04-02"), amount: toCents(28.50), currency: "USD", description: "Viajes de la semana", isExpense: true, accountId: checking.id, userId: user1.id, categoryId: transport.id },
    { name: "Ahorro mensual", transactionDate: new Date("2026-04-01"), amount: toCents(500), currency: "USD", description: "Transferencia a ahorro", isExpense: true, accountId: checking.id, userId: user1.id },
  ];

  for (const tx of txs) {
    await prisma.transaction.create({ data: tx });
  }

  // Maria's transactions
  const mariaTxs = [
    { name: "Salario Marzo", transactionDate: new Date("2026-03-30"), amount: toCents(2800), currency: "USD", description: "Pago mensual", isExpense: false, accountId: mariaChecking.id, userId: user2.id },
    { name: "Recibo de luz", transactionDate: new Date("2026-04-01"), amount: toCents(65), currency: "USD", description: "Factura mensual", isExpense: true, accountId: mariaChecking.id, userId: user2.id, categoryId: mariaServicios.id },
    { name: "Internet", transactionDate: new Date("2026-04-02"), amount: toCents(45), currency: "USD", description: "Plan fibra optica", isExpense: true, accountId: mariaChecking.id, userId: user2.id, categoryId: mariaServicios.id },
  ];

  for (const tx of mariaTxs) {
    await prisma.transaction.create({ data: tx });
  }

  console.log("Created transactions");
  console.log("\nSeed completed!");
  console.log("  User 1: elvin@test.com / Test1234!");
  console.log("  User 2: maria@test.com / Test1234!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
