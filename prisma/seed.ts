import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleaned existing data");

  // Create users
  const password = await argon2.hash("Test1234!");

  const user1 = await prisma.user.create({
    data: {
      firstName: "Elvin",
      lastName: "Sanchez",
      email: "elvin@test.com",
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Maria",
      lastName: "Lopez",
      email: "maria@test.com",
      password,
    },
  });

  console.log(`👤 Created users: ${user1.email}, ${user2.email}`);

  // Create accounts for user1
  const checking = await prisma.account.create({
    data: {
      name: "Cuenta Corriente BAC",
      numberAccount: "1234-5678-9012",
      type: "checking",
      currency: "USD",
      balance: 5200.50,
      userId: user1.id,
    },
  });

  const savings = await prisma.account.create({
    data: {
      name: "Ahorro Banpro",
      numberAccount: "9876-5432-1098",
      type: "savings",
      currency: "USD",
      balance: 12000.00,
      userId: user1.id,
    },
  });

  // Account for user2
  await prisma.account.create({
    data: {
      name: "Cuenta Personal",
      numberAccount: "5555-4444-3333",
      type: "checking",
      currency: "USD",
      balance: 3400.00,
      userId: user2.id,
    },
  });

  console.log("🏦 Created accounts");

  // Create categories for user1
  const food = await prisma.category.create({
    data: {
      name: "Alimentación",
      description: "Gastos en comida y supermercado",
      color: "#ef4444",
      userId: user1.id,
    },
  });

  const transport = await prisma.category.create({
    data: {
      name: "Transporte",
      description: "Gasolina, uber, bus",
      color: "#3b82f6",
      userId: user1.id,
    },
  });

  const entertainment = await prisma.category.create({
    data: {
      name: "Entretenimiento",
      description: "Cine, streaming, salidas",
      color: "#8b5cf6",
      userId: user1.id,
    },
  });

  const salary = await prisma.category.create({
    data: {
      name: "Salario",
      description: "Ingresos mensuales",
      color: "#22c55e",
      userId: user1.id,
    },
  });

  // Category for user2
  await prisma.category.create({
    data: {
      name: "Servicios",
      description: "Luz, agua, internet",
      color: "#f59e0b",
      userId: user2.id,
    },
  });

  console.log("🏷️  Created categories");

  // Create budgets for user1
  await prisma.budget.create({
    data: {
      name: "Presupuesto Comida Abril",
      initDate: new Date("2026-04-01"),
      finishDate: new Date("2026-04-30"),
      amount: 500,
      currency: "USD",
      categoryId: food.id,
      userId: user1.id,
    },
  });

  await prisma.budget.create({
    data: {
      name: "Presupuesto Transporte Abril",
      initDate: new Date("2026-04-01"),
      finishDate: new Date("2026-04-30"),
      amount: 200,
      currency: "USD",
      categoryId: transport.id,
      userId: user1.id,
    },
  });

  await prisma.budget.create({
    data: {
      name: "Entretenimiento Q2",
      initDate: new Date("2026-04-01"),
      finishDate: new Date("2026-06-30"),
      amount: 300,
      currency: "USD",
      categoryId: entertainment.id,
      userId: user1.id,
    },
  });

  console.log("💰 Created budgets");

  // Create transactions for user1
  const transactions = [
    { name: "Salario Marzo", transactionDate: new Date("2026-03-30"), amount: 3500, currency: "USD", description: "Pago quincenal", isExpense: false, accountId: checking.id, userId: user1.id },
    { name: "Supermercado La Colonia", transactionDate: new Date("2026-04-01"), amount: 85.50, currency: "USD", description: "Compras semanales", isExpense: true, accountId: checking.id, userId: user1.id },
    { name: "Gasolina", transactionDate: new Date("2026-04-02"), amount: 45.00, currency: "USD", description: "Tanque lleno", isExpense: true, accountId: checking.id, userId: user1.id },
    { name: "Netflix", transactionDate: new Date("2026-04-01"), amount: 15.99, currency: "USD", description: "Suscripción mensual", isExpense: true, accountId: checking.id, userId: user1.id },
    { name: "Freelance proyecto web", transactionDate: new Date("2026-04-01"), amount: 800, currency: "USD", description: "Pago cliente XYZ", isExpense: false, accountId: savings.id, userId: user1.id },
    { name: "Restaurante El Cafetin", transactionDate: new Date("2026-04-02"), amount: 32.00, currency: "USD", description: "Almuerzo con equipo", isExpense: true, accountId: checking.id, userId: user1.id },
    { name: "Uber semanal", transactionDate: new Date("2026-04-02"), amount: 28.50, currency: "USD", description: "Viajes de la semana", isExpense: true, accountId: checking.id, userId: user1.id },
    { name: "Ahorro mensual", transactionDate: new Date("2026-04-01"), amount: 500, currency: "USD", description: "Transferencia a ahorro", isExpense: true, accountId: checking.id, userId: user1.id },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({ data: tx });
  }

  console.log("📊 Created transactions");
  console.log("\n✅ Seed completed!");
  console.log("\n📋 Test credentials:");
  console.log("   User 1: elvin@test.com / Test1234!");
  console.log("   User 2: maria@test.com / Test1234!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
