import { component$ } from "@builder.io/qwik";
import { Icon } from "./icon";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

export const EmptyState = component$<EmptyStateProps>(
  ({ title, description, icon = "inbox" }) => {
    return (
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 rounded-[2rem] bg-surface-container-low flex items-center justify-center mb-6">
          <Icon name={icon} size="lg" class="text-outline" />
        </div>
        <h3 class="text-lg font-bold tracking-tight text-on-surface mb-1">
          {title}
        </h3>
        {description && (
          <p class="text-sm text-on-surface-variant max-w-xs">
            {description}
          </p>
        )}
      </div>
    );
  }
);
