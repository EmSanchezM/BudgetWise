import { component$ } from "@builder.io/qwik";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = component$<EmptyStateProps>(({ title, description }) => {
  return (
    <div class="flex flex-col items-center justify-center py-12 text-center">
      <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      {description && <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
});
