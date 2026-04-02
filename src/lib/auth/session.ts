import { SignJWT, jwtVerify } from "jose";

const getSecret = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is required");
  return new TextEncoder().encode(secret);
};

export const createSession = async (userId: number): Promise<string> => {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
};

export const verifySession = async (
  token: string
): Promise<{ userId: number } | null> => {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.userId === "number") {
      return { userId: payload.userId };
    }
    return null;
  } catch {
    return null;
  }
};
