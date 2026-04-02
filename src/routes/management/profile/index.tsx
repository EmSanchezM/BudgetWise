import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$, zod$, type DocumentHead } from "@builder.io/qwik-city";
import { getAuthenticatedUser } from "~/lib/auth";
import orm from "~/lib/orm";
import { generateFromPassword, comparePasswordAndHash } from "~/lib/utils";
import { UpdateProfileSchemaValidation, ChangePasswordSchemaValidation } from "~/lib/validation-schemes";

export const useProfile = routeLoader$(async ({ sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  const fullUser = await orm.user.findUnique({
    where: { id: user.id },
    select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
  });
  return fullUser!;
});

export const useUpdateProfile = routeAction$(async (data, { sharedMap }) => {
  const user = getAuthenticatedUser(sharedMap);
  await orm.user.update({
    where: { id: user.id },
    data: { firstName: data.firstName, lastName: data.lastName },
  });
  return { success: true, message: "Profile updated" };
}, zod$(UpdateProfileSchemaValidation));

export const useChangePassword = routeAction$(async (data, { sharedMap, fail }) => {
  const user = getAuthenticatedUser(sharedMap);
  const dbUser = await orm.user.findUnique({ where: { id: user.id } });
  if (!dbUser) return fail(404, { message: "User not found" });

  const isValid = await comparePasswordAndHash(data.currentPassword, dbUser.password);
  if (!isValid) return fail(400, { message: "Current password is incorrect" });

  const newHash = await generateFromPassword(data.newPassword);
  await orm.user.update({ where: { id: user.id }, data: { password: newHash } });
  return { success: true, message: "Password changed" };
}, zod$(ChangePasswordSchemaValidation));

export default component$(() => {
  const profile = useProfile();
  const updateAction = useUpdateProfile();
  const passwordAction = useChangePassword();

  return (
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h1>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{profile.value.firstName} {profile.value.lastName}</h2>
        <p class="text-gray-500 dark:text-gray-400">{profile.value.email}</p>
        <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Member since {new Date(String(profile.value.createdAt)).toLocaleDateString()}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Info</h2>
        {updateAction.value?.message && (
          <div class={`mb-4 p-3 rounded text-sm ${updateAction.value?.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {updateAction.value.message}
          </div>
        )}
        <Form action={updateAction} class="space-y-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input type="text" id="firstName" name="firstName" value={profile.value.firstName}
              class="mt-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={profile.value.lastName}
              class="mt-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>
          <button type="submit" disabled={updateAction.isRunning}
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
            {updateAction.isRunning ? 'Saving...' : 'Save Changes'}
          </button>
        </Form>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
        {passwordAction.value?.message && (
          <div class={`mb-4 p-3 rounded text-sm ${passwordAction.value?.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {passwordAction.value.message}
          </div>
        )}
        <Form action={passwordAction} class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword"
              class="mt-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input type="password" id="newPassword" name="newPassword"
              class="mt-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
          </div>
          <button type="submit" disabled={passwordAction.isRunning}
            class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50">
            {passwordAction.isRunning ? 'Changing...' : 'Change Password'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Profile",
  meta: [{ name: "description", content: "Manage your profile settings" }],
};
