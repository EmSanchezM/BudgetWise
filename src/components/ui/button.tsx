import { $, component$, Slot, type QRL } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  class?: string;
  onClick$?: QRL<() => void>;
  icon?: string;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-primary-container text-white font-bold hover:opacity-90 active:scale-95 transition-all",
  secondary:
    "bg-surface-container-highest text-on-surface font-semibold hover:bg-surface-container-high active:scale-95 transition-all",
  tertiary:
    "text-on-surface font-semibold hover:text-primary active:scale-95 transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-xl gap-2",
};

export const Button = component$<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    class: className,
    onClick$,
    icon,
    iconPosition = "left",
  }) => {
    const navigate = useNavigate();

    const classes = [
      "inline-flex items-center justify-center",
      variantClasses[variant],
      sizeClasses[size],
      disabled ? "opacity-50 pointer-events-none" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick$ = href
      ? $(() => navigate(href))
      : onClick$;

    return (
      <button
        type={type}
        class={classes}
        disabled={disabled}
        onClick$={handleClick$}
      >
        {icon && iconPosition === "left" && (
          <span class="material-symbols-outlined text-[20px]">{icon}</span>
        )}
        <Slot />
        {icon && iconPosition === "right" && (
          <span class="material-symbols-outlined text-[20px]">{icon}</span>
        )}
      </button>
    );
  }
);
