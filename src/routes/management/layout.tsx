import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import type { Session } from "@auth/core/types";
import { PUBLIC_ROUTES } from "~/lib/constants";
import { getAuthenticatedUser } from "~/lib/auth";
import { DesktopSidebar } from "~/components/management/desktop-sidebar";
import { TopAppBar } from "~/components/management/top-app-bar";
import { BottomNav } from "~/components/management/bottom-nav";

export const onRequest: RequestHandler = async ({ sharedMap, redirect, cookie }) => {
  const session = sharedMap.get("session") as Session | undefined;
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(302, PUBLIC_ROUTES.HOME);
  }

  // Cleanup: eliminar cookie vieja del auth manual
  if (cookie.get("session")) {
    cookie.delete("session", { path: "/" });
  }
};

export const useUser = routeLoader$(async ({ sharedMap }) => {
  return getAuthenticatedUser(sharedMap);
});

export default component$(() => {
  const user = useUser();

  return (
    <div class="min-h-screen bg-surface">
      <DesktopSidebar />
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
