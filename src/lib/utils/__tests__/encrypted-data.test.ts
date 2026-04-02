import { generateFromPassword, comparePasswordAndHash } from "../encrypted-data";

describe("password hashing", () => {
  it("generates a hash from password", async () => {
    const hash = await generateFromPassword("testPassword123");
    expect(hash).toBeDefined();
    expect(hash).not.toBe("testPassword123");
    expect(hash.startsWith("$argon2")).toBe(true);
  });

  it("verifies correct password", async () => {
    const password = "mySecurePassword";
    const hash = await generateFromPassword(password);
    const isValid = await comparePasswordAndHash(password, hash);
    expect(isValid).toBe(true);
  });

  it("rejects incorrect password", async () => {
    const hash = await generateFromPassword("correctPassword");
    const isValid = await comparePasswordAndHash("wrongPassword", hash);
    expect(isValid).toBe(false);
  });

  it("returns false for invalid hash", async () => {
    const isValid = await comparePasswordAndHash("password", "invalidhash");
    expect(isValid).toBe(false);
  });
});
