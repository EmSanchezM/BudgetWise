import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination } from "~/components/shared";
import orm from "~/lib/orm";

export const useCategories = routeLoader$(async ({ sharedMap, url }) => {
  const user = getAuthenticatedUser(sharedMap);

  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 10;
  const sort = url.searchParams.get("sort") || "createdAt";
  const order = url.searchParams.get("order") || "desc";
  const orderBy = { [sort]: order };

  const where = {
    userId: user.id,
    deletedAt: null
  };

  const [categories, total] = await Promise.all([
    orm.category.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        color: true,
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    orm.category.count({ where }),
  ]);

  return { items: categories, page, totalPages: Math.ceil(total / pageSize) };
});

export const useDeleteCategory = routeAction$(async (data, { fail, sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const id = Number(data.id);
  if (isNaN(id)) return fail(400, { message: "Invalid ID" });

  await orm.category.update({
    where: { id, userId: user.id },
    data: { deletedAt: new Date() },
  });

  return { success: true };
});

export default component$(() => {
  const categories = useCategories();
  const deleteCategory = useDeleteCategory();

  return (
    <section>
      <header class="mb-4">
        <h1 class="font-bold capitalize text-2xl mb-4">Categories</h1>
        <Link href="create" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create category</Link>
      </header>
      <div class="flex gap-2 mb-4 text-sm">
        <span class="text-gray-500">Sort by:</span>
        <Link href="?sort=name&order=asc" class="text-indigo-600 hover:underline">Name</Link>
        <Link href="?sort=createdAt&order=desc" class="text-indigo-600 hover:underline">Newest</Link>
      </div>
      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.value.items.length === 0 ? (
          <EmptyState title="No categories yet" description="Create your first category to get started." />
        ) : (
          categories.value.items.map(category => {
            return (
              <article class="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <Link href={`${category.id}`}>
                  <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{category.name}</span>
                </Link>
                <p class="mb-3 font-normal text-gray-700">
                  {category.description}
                </p>
                <Link href={`${category.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Detail
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
                <Form action={deleteCategory} class="inline-flex">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit" class="inline-flex items-center px-3 py-2 mx-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Delete
                  </button>
                </Form>
              </article>
            )
          })
        )}
      </main>
      <Pagination currentPage={categories.value.page} totalPages={categories.value.totalPages} baseUrl="/management/categories" />
    </section>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Categories",
  meta: [
    {
      name: "description",
      content: "A personal finance app that tracks expenses, creates budgets and provides money-saving tips",
    },
  ],
};
