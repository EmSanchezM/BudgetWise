import { component$, Slot } from "@builder.io/qwik";

type CardVariant = "standard" | "featured" | "dark";

interface CardProps {
  variant?: CardVariant;
  class?: string;
}

const variantClasses: Record<CardVariant, string> = {
  standard: "bg-surface-container-lowest rounded-xl editorial-shadow",
  featured: "bg-surface-container-lowest rounded-[2rem] editorial-shadow",
  dark: "bg-primary text-on-primary rounded-[2rem] editorial-shadow",
};

export const Card = component$<CardProps>(
  ({ variant = "standard", class: className }) => {
    return (
      <div class={[variantClasses[variant], className ?? ""].join(" ")}>
        <Slot />
      </div>
    );
  }
);
