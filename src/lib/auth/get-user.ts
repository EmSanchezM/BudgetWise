import type { UserAuth } from "~/lib/models";

export function getAuthenticatedUser(sharedMap: Map<string, unknown>): UserAuth {
  const user = sharedMap.get("user") as UserAuth;
  if (!user) throw new Error("User not authenticated");
  return user;
}
