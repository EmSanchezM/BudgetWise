import { component$ } from "@builder.io/qwik";

interface IconProps {
  name: string;
  fill?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  class?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "text-[18px]",
  md: "text-[24px]",
  lg: "text-[32px]",
  xl: "text-[40px]",
};

export const Icon = component$<IconProps>(
  ({ name, fill = false, size = "md", class: className }) => {
    return (
      <span
        class={[
          "material-symbols-outlined",
          sizeClasses[size],
          className ?? "",
        ].join(" ")}
        style={
          fill
            ? "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            : undefined
        }
      >
        {name}
      </span>
    );
  }
);
