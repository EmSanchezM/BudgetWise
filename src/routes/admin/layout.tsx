import { Slot, component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

import orm from "~/lib/orm";

export const onRequest: RequestHandler = async ({
  cookie,
  redirect,
  sharedMap,
}) => {
  const jwt = cookie.get("jwt");

  if (!jwt) throw redirect(301, "/sign-in");

  const user = await orm.user.findUnique({ where: { id: +jwt.value }, select: { id: true, firstName: true, lastName: true, email: true } })
  sharedMap.set("user", user);

  return;
};

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});