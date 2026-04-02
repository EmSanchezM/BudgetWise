import { component$ } from "@builder.io/qwik";

interface InputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "date" | "search";
  placeholder?: string;
  value?: string | number;
  hasError?: boolean;
  disabled?: boolean;
  class?: string;
}

export const Input = component$<InputProps>(
  ({
    id,
    name,
    type = "text",
    placeholder,
    value,
    hasError = false,
    disabled = false,
    class: className,
  }) => {
    return (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        class={[
          "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl",
          "px-4 py-3 text-sm text-on-surface placeholder:text-outline",
          "transition-all duration-200",
          "focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20",
          hasError
            ? "border-error/40 focus:border-error/60 focus:ring-error/20"
            : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className ?? "",
        ].join(" ")}
      />
    );
  }
);
