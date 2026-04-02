import { z } from "zod";
import { CreateCategorySchemaValidation } from "../category.schema";

const schema = z.object(CreateCategorySchemaValidation);

describe("CreateCategorySchemaValidation", () => {
  it("accepts valid data", () => {
    const result = schema.safeParse({
      name: "Food",
      description: "Food expenses",
      color: "#ff0000",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short description", () => {
    const result = schema.safeParse({
      name: "Food",
      description: "abc",
      color: "#ff0000",
    });
    expect(result.success).toBe(false);
  });
});
