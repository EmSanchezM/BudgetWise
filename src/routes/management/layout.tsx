import { Slot, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$, useLocation, type RequestHandler } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";
import { verifySession, SESSION_COOKIE_NAME, getAuthenticatedUser } from "~/lib/auth";
import { Sidebar, TopNav } from "~/components/management";

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

  return;
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
  const location = useLocation();
  const isSidebarOpen = useSignal(false);

  return (
    <>
      <TopNav user={user.value} isSidebarOpen={isSidebarOpen} />
      <Sidebar logoutAction={logout} isOpen={isSidebarOpen} />

      <div class="p-4 sm:ml-64">
        <div key={location.url.pathname} class="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <Slot />
        </div>
      </div>
    </>
  );
});
