import { QwikAuth$ } from "@auth/qwik";
import Credentials from "@auth/qwik/providers/credentials";
import orm from "~/lib/orm";
import { comparePasswordAndHash } from "~/lib/utils";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
}

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const email = credentials.email as string;
          const password = credentials.password as string;

          if (!email || !password) return null;

          const user = await orm.user.findUnique({ where: { email } });
          if (!user) return null;

          const valid = await comparePasswordAndHash(password, user.password);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        },
      }),
    ],
    session: {
      strategy: "jwt" as const,
      maxAge: 60 * 60 * 24 * 7,
    },
    callbacks: {
      jwt({ token, user }) {
        if (user) {
          const authUser = user as AuthUser;
          token.id = authUser.id;
          token.firstName = authUser.firstName;
          token.lastName = authUser.lastName;
        }
        return token;
      },
      session({ session, token }) {
        const typedToken = token as { id: string; firstName: string; lastName: string };
        const user = session.user as unknown as Record<string, unknown>;
        user.id = typedToken.id;
        user.firstName = typedToken.firstName;
        user.lastName = typedToken.lastName;
        return session;
      },
    },
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
    },
  })
);
