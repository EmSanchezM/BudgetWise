import { $, component$, type Signal, Slot } from "@builder.io/qwik";

interface ConfirmDialogProps {
  open: Signal<boolean>;
  title?: string;
  description?: string;
}

export const ConfirmDialog = component$<ConfirmDialogProps>(
  ({ open, title = "Confirm deletion", description = "This action cannot be undone. Are you sure you want to continue?" }) => {
    if (!open.value) return null;

    const close = $(() => { open.value = false; });

    return (
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-6"
        onClick$={close}
      >
        <div class="absolute inset-0 bg-primary/40 backdrop-blur-sm" />

        <div
          class="relative bg-surface-container-lowest rounded-[2rem] p-8 max-w-sm w-full editorial-shadow animate-in"
          onClick$={(e) => e.stopPropagation()}
        >
          <div class="flex items-center justify-center w-14 h-14 rounded-full bg-error-container/30 mx-auto mb-6">
            <span class="material-symbols-outlined text-error text-[28px]">warning</span>
          </div>

          <h3 class="text-xl font-bold tracking-tight text-primary text-center mb-2">
            {title}
          </h3>
          <p class="text-on-surface-variant text-sm text-center leading-relaxed mb-8">
            {description}
          </p>

          <div class="flex gap-3">
            <button
              type="button"
              onClick$={close}
              class="flex-1 py-3 rounded-xl font-bold text-sm bg-surface-container-high text-on-surface active:scale-95 transition-all"
            >
              Cancel
            </button>
            <div class="flex-1">
              <Slot />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
