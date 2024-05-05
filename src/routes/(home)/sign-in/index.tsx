import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";

import orm from "~/lib/orm";
import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { comparePasswordAndHash } from "~/lib/utils";
import { SignInSchemaValidation } from "~/lib/validation-schemes";
import { FormGroup } from "~/components/shared/form";

export const useSignIn = routeAction$(async (data, { fail, redirect, cookie }) => {

  const user = await orm.user.findUnique({ where: { email: data.email } })

  if (!user) fail(500, { message: 'Credentials not valid' });

  const validPassword = await comparePasswordAndHash(data.password, user!.password);

  if (!validPassword) fail(500, { message: 'Credentials not valid' });

  cookie.set("jwt", user!.id, { secure: true, path: "/" });

  redirect(301, MANAGEMENT_ROUTES.DAHSBOARD);
}, zod$(SignInSchemaValidation));

export default component$(() => {
  const action = useSignIn();

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-dashed bg-blue-300">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Budgetwise" width={100} height={40} />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
        </div>
        <Form action={action} class="space-y-6">
          <FormGroup
            type="email"
            labelName="Email address"
            id="email"
            name="email"
            errors={action.value?.fieldErrors?.email}
          />

          <FormGroup
            type="password"
            labelName="Password"
            id="password"
            name="password"
            errors={action.value?.fieldErrors?.password}
          />
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </Form>
      </div>
    </section>
  )
})