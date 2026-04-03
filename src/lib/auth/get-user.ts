import type { Session } from "@auth/core/types";
import type { UserAuth } from "~/lib/models";

export function getAuthenticatedUser(sharedMap: Map<string, unknown>): UserAuth {
  const session = sharedMap.get("session") as Session | undefined;
  if (!session?.user) throw new Error("User not authenticated");

  return {
    id: session.user.id,
    email: session.user.email!,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  };
}
