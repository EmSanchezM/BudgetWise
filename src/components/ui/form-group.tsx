import { component$ } from "@builder.io/qwik";
import { Input } from "./input";
import { Select } from "./select";

interface FormGroupProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "date" | "search" | "select";
  placeholder?: string;
  errors?: string | string[] | undefined;
  items?: { id: number | string; name: string }[];
  class?: string;
}

export const FormGroup = component$<FormGroupProps>(
  ({ label, id, name, type = "text", placeholder, errors, items, class: className }) => {
    const hasError = !!errors;
    const errorMessage = hasError
      ? Array.isArray(errors) ? errors.join(", ") : errors
      : "";

    return (
      <div class={className}>
        <label
          for={id}
          class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2"
        >
          {label}
        </label>
        {type === "select" ? (
          <Select
            id={id}
            name={name}
            items={items ?? []}
            placeholder={placeholder}
            hasError={hasError}
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            hasError={hasError}
          />
        )}
        {hasError && (
          <p class="mt-1.5 text-xs text-error font-medium">{errorMessage}</p>
        )}
      </div>
    );
  }
);
