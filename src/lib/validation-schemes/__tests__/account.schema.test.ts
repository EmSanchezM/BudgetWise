import { z } from "zod";
import { CreateAccountSchemaValidation } from "../account.schema";

const schema = z.object(CreateAccountSchemaValidation);

describe("CreateAccountSchemaValidation", () => {
  it("accepts valid data", () => {
    const result = schema.safeParse({
      name: "My Account",
      numberAccount: "123456",
      type: "checking",
      currency: "USD",
      balance: "100",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.balance).toBe(10000); // 100 * 100 cents
    }
  });

  it("rejects missing name", () => {
    const result = schema.safeParse({
      numberAccount: "123456",
      type: "checking",
      currency: "USD",
      balance: "100",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short name", () => {
    const result = schema.safeParse({
      name: "A",
      numberAccount: "123456",
      type: "checking",
      currency: "USD",
      balance: "100",
    });
    expect(result.success).toBe(false);
  });

  it("transforms balance to cents", () => {
    const result = schema.safeParse({
      name: "Account",
      numberAccount: "123456",
      type: "checking",
      currency: "USD",
      balance: "55.99",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.balance).toBe(5599);
    }
  });
});
