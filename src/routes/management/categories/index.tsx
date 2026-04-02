import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import { EmptyState, Pagination } from "~/components/ui";
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

  return { items: categories, page, totalPages: Math.ceil(total / pageSize), total };
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
    <div class="space-y-8">
      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-2xl">
          <h1 class="text-primary font-headline font-bold text-[2.5rem] lg:text-[3.5rem] leading-[1.1] tracking-tight mb-2">
            Categories
          </h1>
          <p class="text-on-surface-variant text-sm lg:text-base leading-relaxed max-w-lg">
            Organize your financial narrative with a taxonomy that reflects your life.
          </p>
        </div>
        <Link
          href="create"
          class="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shrink-0"
        >
          <span class="material-symbols-outlined">add</span>
          Create Category
        </Link>
      </div>

      {/* Sort chips */}
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        <span class="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest self-center mr-1">Sort:</span>
        <Link href="?sort=name&order=asc" class="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">Name</Link>
        <Link href="?sort=createdAt&order=desc" class="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">Newest</Link>
      </div>

      {/* Category Cards */}
      {categories.value.items.length === 0 ? (
        <EmptyState title="No categories yet" description="Create your first category to get started." icon="grid_view" />
      ) : (
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.value.items.map((category) => (
            <div
              key={category.id}
              class="bg-surface-container-lowest rounded-xl p-6 editorial-shadow group"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: (category.color || '#0c1427') + '1a' }}
                >
                  <span
                    class="material-symbols-outlined"
                    style={{ color: category.color || '#0c1427' }}
                  >
                    grid_view
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <Link href={`${category.id}`}>
                      <h3 class="font-bold text-lg tracking-tight text-primary hover:underline">{category.name}</h3>
                    </Link>
                    <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`${category.id}`} class="p-1 text-outline hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-sm">edit</span>
                      </Link>
                      <Form action={deleteCategory} class="inline">
                        <input type="hidden" name="id" value={category.id} />
                        <button type="submit" class="p-1 text-outline hover:text-error transition-colors">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </Form>
                    </div>
                  </div>
                  {category.description && (
                    <p class="text-on-surface-variant text-sm line-clamp-2">{category.description}</p>
                  )}
                  {category.color && (
                    <div class="flex items-center gap-2 mt-2">
                      <div class="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{category.color}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={categories.value.page} totalPages={categories.value.totalPages} baseUrl="/management/categories" />
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Categories",
  meta: [{ name: "description", content: "Manage your financial categories" }],
};
