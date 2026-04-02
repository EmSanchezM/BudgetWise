import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export const Pagination = component$<PaginationProps>(({ currentPage, totalPages, baseUrl }) => {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const buildUrl = (page: number) => {
    const url = new URL(baseUrl, "http://localhost");
    url.searchParams.set("page", String(page));
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  return (
    <nav class="flex items-center justify-center gap-2 mt-6">
      {currentPage > 1 && (
        <Link href={buildUrl(currentPage - 1)} class="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300">
          Previous
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={buildUrl(page)}
          class={`px-3 py-1 rounded text-sm ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={buildUrl(currentPage + 1)} class="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300">
          Next
        </Link>
      )}
    </nav>
  );
});
