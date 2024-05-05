import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import { FormGroup } from "~/components/shared/form";
import { PUBLIC_ROUTES } from "~/lib/constants";

import orm from "~/lib/orm";
import { generateFromPassword } from "~/lib/utils";
import { SignUpSchemaValidation } from "~/lib/validation-schemes";

export const useSignUp = routeAction$(async (data, { fail, redirect }) => {
  const hashPassword = await generateFromPassword(data.password);

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashPassword
  };

  const user = await orm.user.create({ data: payload });

  if (!user.id) fail(500, { message: 'Error' });

  redirect(301, PUBLIC_ROUTES.SIGN_IN);
}, zod$(SignUpSchemaValidation));

export default component$(() => {
  const action = useSignUp();

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-dashed bg-blue-300">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Budgetwise" width={100} height={40} />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
        </div>
        <Form action={action} class="space-y-6">
          <FormGroup
            type="text"
            labelName="First name"
            id="firstName"
            name="firstName"
            errors={action.value?.fieldErrors?.firstName}
          />

          <FormGroup
            type="text"
            labelName="Last name"
            id="lastName"
            name="lastName"
            errors={action.value?.fieldErrors?.lastName}
          />

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