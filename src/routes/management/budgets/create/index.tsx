import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, routeLoader$, zod$, Form } from "@builder.io/qwik-city";

import { FormGroup } from "~/components/shared/form";

import { MANAGEMENT_ROUTES } from "~/lib/constants";
import { UserAuth } from "~/lib/models";
import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { CreateBudgetSchemaValidation } from "~/lib/validation-schemes";

export const useCategories = routeLoader$(async () => {
  const categories = await orm.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return categories;
});

export const useCreateBudget = routeAction$(async (data, { sharedMap, fail, redirect }) => {
  const user = sharedMap.get('user') as UserAuth;

  const budget = await orm.budget.create({
    data: {
      userId: user.id,
      name: data.name,
      initDate: data.initDate,
      finishDate: data.finishDate,
      amount: data.amount,
      currency: data.currency,
      categoryId: data.category,
    },
    select: { id: true }
  });

  if (!budget.id) fail(500, { message: 'Error create budget' });

  redirect(301, MANAGEMENT_ROUTES.BUDGETS);
}, zod$(CreateBudgetSchemaValidation));

export default component$(() => {
  const categories = useCategories();
  const action = useCreateBudget();

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto">
      <div class="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm border-dashed bg-blue-300">
          <img class="mx-auto mt-4 h-80 w-auto object-contain" src="/budget-wise.jpg" alt="Budgetwise" width={100} height={40} />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create budget</h2>
          <p class="mt-10 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sunt, temporibus sapiente rerum sed molestias eligendi tenetur nulla laboriosam accusamus magnam beatae, corrupti consectetur blanditiis, possimus harum reprehenderit quae. Ad?
          </p>
        </div>
        <Form action={action} class="space-y-6">
          <FormGroup
            type="text"
            labelName="Name"
            id="name"
            name="name"
            errors={action.value?.fieldErrors?.name}
          />

          <FormGroup
            type="select"
            labelName="Category"
            id="category"
            name="category"
            items={categories.value}
            errors={action.value?.fieldErrors?.category}
          />

          <FormGroup
            type="select"
            labelName="Currency"
            id="currency"
            name="currency"
            items={currencies.map(currency => ({ id: currency.value, name: currency.label }))}
            errors={action.value?.fieldErrors?.currency}
          />
          <FormGroup
            type="number"
            labelName="Amount"
            id="amount"
            name="amount"
            errors={action.value?.fieldErrors?.amount}
          />
          <FormGroup
            type="date"
            labelName="Init date"
            id="initDate"
            name="initDate"
            errors={action.value?.fieldErrors?.initDate}
          />
          <FormGroup
            type="date"
            labelName="Finish date"
            id="finishDate"
            name="finishDate"
            errors={action.value?.fieldErrors?.finishDate}
          />

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
          </div>
        </Form>
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: "BudgetWise App | Create budget",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};