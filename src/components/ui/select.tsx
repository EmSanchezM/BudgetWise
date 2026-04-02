import { component$ } from "@builder.io/qwik";

interface SelectItem {
  id: number | string;
  name: string;
}

interface SelectProps {
  id: string;
  name: string;
  items: SelectItem[];
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  class?: string;
}

export const Select = component$<SelectProps>(
  ({
    id,
    name,
    items,
    placeholder,
    hasError = false,
    disabled = false,
    class: className,
  }) => {
    return (
      <select
        id={id}
        name={name}
        disabled={disabled}
        class={[
          "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl",
          "px-4 py-3 text-sm text-on-surface",
          "transition-all duration-200 appearance-none",
          "focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20",
          hasError
            ? "border-error/40 focus:border-error/60 focus:ring-error/20"
            : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className ?? "",
        ].join(" ")}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
);
