import { z } from "zod";
import { CreateBudgetSchemaValidation } from "../budget.schema";

const schema = z.object(CreateBudgetSchemaValidation);

describe("CreateBudgetSchemaValidation", () => {
  it("accepts valid data", () => {
    const result = schema.safeParse({
      name: "Monthly Budget",
      amount: "500",
      currency: "USD",
      category: "1",
      initDate: "2026-04-01",
      finishDate: "2026-04-30",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(50000);
    }
  });

  it("rejects missing dates", () => {
    const result = schema.safeParse({
      name: "Budget",
      amount: "500",
      currency: "USD",
      category: "1",
    });
    expect(result.success).toBe(false);
  });
});
