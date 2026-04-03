import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";
import { verifySession, SESSION_COOKIE_NAME, getAuthenticatedUser } from "~/lib/auth";
import { DesktopSidebar } from "~/components/management/desktop-sidebar";
import { TopAppBar } from "~/components/management/top-app-bar";
import { BottomNav } from "~/components/management/bottom-nav";

import orm from "~/lib/orm";

export const onRequest: RequestHandler = async ({
  cookie,
  redirect,
  sharedMap,
}) => {
  const sessionCookie = cookie.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) throw redirect(302, PUBLIC_ROUTES.HOME);

  const session = await verifySession(sessionCookie.value);

  if (!session) {
    cookie.delete(SESSION_COOKIE_NAME, { path: "/" });
    throw redirect(302, PUBLIC_ROUTES.HOME);
  }

  const user = await orm.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true
    }
  });

  if (!user) {
    cookie.delete(SESSION_COOKIE_NAME, { path: "/" });
    throw redirect(302, PUBLIC_ROUTES.HOME);
  }

  sharedMap.set("user", user);
};

export const useUser = routeLoader$(async ({ sharedMap }) => {
  return getAuthenticatedUser(sharedMap);
});

export const useLogout = routeAction$(async (_, { cookie, redirect }) => {
  cookie.delete(SESSION_COOKIE_NAME, { path: "/" });
  throw redirect(302, PUBLIC_ROUTES.HOME);
});

export default component$(() => {
  const user = useUser();
  const logout = useLogout();

  return (
    <div class="min-h-screen bg-surface">
      <DesktopSidebar logoutAction={logout} />
      <TopAppBar user={user.value} />

      <main class="lg:ml-64 pt-[72px] lg:pt-0 pb-32 lg:pb-8">
        <div class="p-6 lg:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <Slot />
        </div>
      </main>

      <BottomNav />
    </div>
  );
});
