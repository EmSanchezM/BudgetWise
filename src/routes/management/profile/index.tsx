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

const inputClass = "block w-full bg-surface-container-low border border-outline-variant/15 rounded-xl px-4 py-3 text-sm text-on-surface transition-all duration-200 focus:outline-none focus:bg-surface-container-highest focus:border-outline-variant/40 focus:ring-1 focus:ring-primary/20";

export default component$(() => {
  const profile = useProfile();
  const updateAction = useUpdateProfile();
  const passwordAction = useChangePassword();

  return (
    <div class="max-w-lg mx-auto space-y-8">
      <h1 class="font-headline font-bold text-3xl tracking-tight text-primary">Profile</h1>

      {/* User info */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-white text-xl font-bold">
            {profile.value.firstName.charAt(0)}{profile.value.lastName.charAt(0)}
          </div>
          <div>
            <h2 class="font-bold text-xl tracking-tight text-primary">{profile.value.firstName} {profile.value.lastName}</h2>
            <p class="text-on-surface-variant text-sm">{profile.value.email}</p>
          </div>
        </div>
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Member since {new Date(String(profile.value.createdAt)).toLocaleDateString()}
        </p>
      </div>

      {/* Update info */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <h2 class="font-bold text-lg tracking-tight text-primary mb-6">Update Info</h2>
        {updateAction.value?.message && (
          <div class={["mb-6 p-4 rounded-xl text-sm font-medium", updateAction.value?.success ? "bg-on-tertiary-container/10 text-on-tertiary-container" : "bg-error-container/30 text-error"].join(" ")}>
            {updateAction.value.message}
          </div>
        )}
        <Form action={updateAction} class="space-y-5">
          <div>
            <label for="firstName" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">First Name</label>
            <input type="text" id="firstName" name="firstName" value={profile.value.firstName} class={inputClass} />
          </div>
          <div>
            <label for="lastName" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={profile.value.lastName} class={inputClass} />
          </div>
          <button type="submit" disabled={updateAction.isRunning} class="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {updateAction.isRunning ? 'Saving...' : 'Save Changes'}
          </button>
        </Form>
      </div>

      {/* Change password */}
      <div class="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow">
        <h2 class="font-bold text-lg tracking-tight text-primary mb-6">Change Password</h2>
        {passwordAction.value?.message && (
          <div class={["mb-6 p-4 rounded-xl text-sm font-medium", passwordAction.value?.success ? "bg-on-tertiary-container/10 text-on-tertiary-container" : "bg-error-container/30 text-error"].join(" ")}>
            {passwordAction.value.message}
          </div>
        )}
        <Form action={passwordAction} class="space-y-5">
          <div>
            <label for="currentPassword" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword" class={inputClass} />
          </div>
          <div>
            <label for="newPassword" class="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">New Password</label>
            <input type="password" id="newPassword" name="newPassword" class={inputClass} />
          </div>
          <button type="submit" disabled={passwordAction.isRunning} class="w-full bg-surface-container-highest text-on-surface py-4 rounded-xl font-bold active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {passwordAction.isRunning ? 'Changing...' : 'Change Password'}
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BudgetWise | Profile",
  meta: [{ name: "description", content: "Manage your profile" }],
};
