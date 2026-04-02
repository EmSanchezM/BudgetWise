import { $, component$ } from "@builder.io/qwik";

export const ThemeToggle = component$(() => {
  const setTheme = $((theme: string) => {
    document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365}`;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
  });

  return (
    <div class="flex items-center gap-1">
      <button
        onClick$={() => setTheme("light")}
        title="Light"
        class="p-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        ☀️
      </button>
      <button
        onClick$={() => setTheme("dark")}
        title="Dark"
        class="p-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        🌙
      </button>
      <button
        onClick$={() => setTheme("system")}
        title="System"
        class="p-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        💻
      </button>
    </div>
  );
});
