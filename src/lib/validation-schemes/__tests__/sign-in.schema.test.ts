import { z } from "zod";
import { SignInSchemaValidation } from "../sign-in.schema";

const schema = z.object(SignInSchemaValidation);

describe("SignInSchemaValidation", () => {
  it("accepts valid credentials", () => {
    const result = schema.safeParse({
      email: "user@test.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = schema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = schema.safeParse({
      email: "user@test.com",
      password: "12345",
    });
    expect(result.success).toBe(false);
  });
});
