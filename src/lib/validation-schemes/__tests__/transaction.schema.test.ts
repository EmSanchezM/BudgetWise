import { z } from "zod";
import { CreateTransactionSchemaValidation } from "../transaction.schema";

const schema = z.object(CreateTransactionSchemaValidation);

describe("CreateTransactionSchemaValidation", () => {
  it("accepts valid data", () => {
    const result = schema.safeParse({
      name: "Grocery Shopping",
      transactionDate: "2026-04-01",
      amount: "85.50",
      currency: "USD",
      description: "Weekly groceries",
      account: "1",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(8550);
    }
  });

  it("rejects zero amount", () => {
    const result = schema.safeParse({
      name: "Test",
      transactionDate: "2026-04-01",
      amount: "0",
      currency: "USD",
      description: "test",
      account: "1",
    });
    expect(result.success).toBe(false);
  });
});
