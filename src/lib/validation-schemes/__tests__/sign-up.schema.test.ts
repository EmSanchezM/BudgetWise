import { z } from "zod";
import { SignUpSchemaValidation } from "../sign-up.schema";

const schema = z.object(SignUpSchemaValidation);

describe("SignUpSchemaValidation", () => {
  it("accepts valid data", () => {
    const result = schema.safeParse({
      email: "user@test.com",
      firstName: "John",
      lastName: "Doe",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing firstName", () => {
    const result = schema.safeParse({
      email: "user@test.com",
      lastName: "Doe",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short firstName", () => {
    const result = schema.safeParse({
      email: "user@test.com",
      firstName: "J",
      lastName: "Doe",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });
});
