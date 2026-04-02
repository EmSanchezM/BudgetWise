import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, zod$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { currencies } from "~/lib/utils";
import { UpdateSettingsSchemaValidation } from "~/lib/validation-schemes";

export const useSettings = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  let settings = await orm.userSettings.findUnique({ where: { userId: user.id } });
  if (!settings) {
    settings = await orm.userSettings.create({
      data: { userId: user.id },
    });
  }
  return settings;
});

export const useUpdateSettings = routeAction$(async (data, { sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  await orm.userSettings.upsert({
    where: { userId: user.id },
    update: {
      defaultCurrency: data.defaultCurrency,
      dateFormat: data.dateFormat,
      theme: data.theme,
    },
    create: {
      userId: user.id,
      defaultCurrency: data.defaultCurrency,
      dateFormat: data.dateFormat,
      theme: data.theme,
    },
  });
  return { success: true, message: "Settings saved" };
}, zod$(UpdateSettingsSchemaValidation));

export default component$(() => {
  const settings = useSettings();
  const action = useUpdateSettings();

  const dateFormats = [
    { id: "MM/DD/YYYY", name: "MM/DD/YYYY" },
    { id: "DD/MM/YYYY", name: "DD/MM/YYYY" },
    { id: "YYYY-MM-DD", name: "YYYY-MM-DD" },
  ];

  return (
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      {action.value?.message && (
        <div class={`mb-4 p-3 rounded text-sm ${action.value?.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {action.value.message}
        </div>
      )}

      <Form action={action} class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <div>
          <label for="defaultCurrency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Currency</label>
          <select id="defaultCurrency" name="defaultCurrency"
            class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
            {currencies.map((c) => (
              <option key={c.value} value={c.value} selected={settings.value.defaultCurrency === c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label for="dateFormat" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
          <select id="dateFormat" name="dateFormat"
            class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
            {dateFormats.map((df) => (
              <option key={df.id} value={df.id} selected={settings.value.dateFormat === df.id}>
                {df.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label for="theme" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme</label>
          <select id="theme" name="theme"
            class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
            <option value="light" selected={settings.value.theme === "light"}>Light</option>
            <option value="dark" selected={settings.value.theme === "dark"}>Dark</option>
            <option value="system" selected={settings.value.theme === "system"}>System</option>
          </select>
        </div>

        <button type="submit" disabled={action.isRunning}
          class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
          {action.isRunning ? 'Saving...' : 'Save Settings'}
        </button>
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Settings",
  meta: [{ name: "description", content: "Manage your app settings" }],
};
