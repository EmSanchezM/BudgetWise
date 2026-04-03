import { component$, Slot } from "@builder.io/qwik";

type ChipVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

interface ChipProps {
  variant?: ChipVariant;
  class?: string;
}

const variantClasses: Record<ChipVariant, string> = {
  default:
    "bg-surface-container-high text-on-surface-variant",
  primary:
    "bg-primary-fixed/20 text-primary",
  secondary:
    "bg-secondary-container/30 text-on-secondary-container",
  success:
    "bg-on-tertiary-container/10 text-on-tertiary-container",
  error:
    "bg-error-container/30 text-error",
  warning:
    "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant",
  info:
    "bg-secondary-fixed/30 text-secondary",
};

export const Chip = component$<ChipProps>(
  ({ variant = "default", class: className }) => {
    return (
      <span
        class={[
          "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md",
          variantClasses[variant],
          className ?? "",
        ].join(" ")}
      >
        <Slot />
      </span>
    );
  }
);
