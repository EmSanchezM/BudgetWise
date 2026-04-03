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
    settings = await orm.userSettings.create({ data: { userId: user.id } });
  }
  return settings;
});

export const useUpdateSettings = routeAction$(async (data, { sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  await orm.userSettings.upsert({
    where: { userId: user.id },
    update: { defaultCurrency: data.defaultCurrency, dateFormat: data.dateFormat, theme: data.theme },
    create: { userId: user.id, defaultCurrency: data.defaultCurrency, dateFormat: data.dateFormat, theme: data.theme },
  });
  return { success: true, message: "Settings saved" };
}, zod$(UpdateSettingsSchemaValidation));

const selectClass = "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface appearance-none transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20";

export default component$(() => {
  const settings = useSettings();
  const action = useUpdateSettings();

  const dateFormats = [
    { id: "MM/DD/YYYY", name: "MM/DD/YYYY" },
    { id: "DD/MM/YYYY", name: "DD/MM/YYYY" },
    { id: "YYYY-MM-DD", name: "YYYY-MM-DD" },
  ];

  return (
    <div class="max-w-lg mx-auto space-y-8">
      <h1 class="font-headline font-bold text-3xl tracking-tight text-primary">Settings</h1>

      {action.value?.message && (
        <div class={["p-4 rounded-xl text-sm font-medium", action.value?.success ? "bg-on-tertiary-container/10 text-on-tertiary-container" : "bg-error-container/30 text-error"].join(" ")}>
          {action.value.message}
        </div>
      )}

      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <Form action={action} class="space-y-6">
          <div>
            <label for="defaultCurrency" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Default Currency</label>
            <select id="defaultCurrency" name="defaultCurrency" class={selectClass}>
              {currencies.map((c) => (
                <option key={c.value} value={c.value} selected={settings.value.defaultCurrency === c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label for="dateFormat" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Date Format</label>
            <select id="dateFormat" name="dateFormat" class={selectClass}>
              {dateFormats.map((df) => (
                <option key={df.id} value={df.id} selected={settings.value.dateFormat === df.id}>{df.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label for="theme" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Theme</label>
            <select id="theme" name="theme" class={selectClass}>
              <option value="light" selected={settings.value.theme === "light"}>Light</option>
              <option value="dark" selected={settings.value.theme === "dark"}>Dark</option>
              <option value="system" selected={settings.value.theme === "system"}>System</option>
            </select>
          </div>

          <button type="submit" disabled={action.isRunning} class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {action.isRunning ? 'Saving...' : 'Save Settings'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Settings",
  meta: [{ name: "description", content: "Manage your app settings" }],
};
