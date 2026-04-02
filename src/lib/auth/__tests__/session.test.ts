import { vi } from "vitest";

vi.stubEnv("SESSION_SECRET", "test-secret-key-for-testing-min-32-chars");

import { createSession, verifySession } from "../session";

describe("session", () => {
  it("creates a valid JWT token", async () => {
    const token = await createSession(42);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  it("verifies a valid token and returns userId", async () => {
    const token = await createSession(42);
    const session = await verifySession(token);
    expect(session).toEqual({ userId: 42 });
  });

  it("returns null for invalid token", async () => {
    const session = await verifySession("invalid.token.here");
    expect(session).toBeNull();
  });

  it("returns null for empty token", async () => {
    const session = await verifySession("");
    expect(session).toBeNull();
  });

  it("returns null for tampered token", async () => {
    const token = await createSession(42);
    const tampered = token.slice(0, -5) + "xxxxx";
    const session = await verifySession(tampered);
    expect(session).toBeNull();
  });
});
