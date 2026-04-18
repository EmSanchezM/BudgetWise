import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export const Pagination = component$<PaginationProps>(
  ({ currentPage, totalPages, baseUrl }) => {
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
      <nav class="flex items-center justify-center gap-1.5 mt-8">
        {currentPage > 1 && (
          <Link
            href={buildUrl(currentPage - 1)}
            class="flex items-center justify-center w-9 h-9 rounded-xl text-sm text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </Link>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            href={buildUrl(page)}
            class={[
              "flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold transition-colors",
              page === currentPage
                ? "bg-gradient-to-br from-primary to-primary-container text-white"
                : "text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high",
            ].join(" ")}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={buildUrl(currentPage + 1)}
            class="flex items-center justify-center w-9 h-9 rounded-xl text-sm text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        )}
      </nav>
    );
  }
);
