import { component$ } from "@builder.io/qwik";

export interface TopAppBarUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface TopAppBarProps {
  user: TopAppBarUser;
}

export const TopAppBar = component$<TopAppBarProps>(({ user }) => {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <>
      {/* Mobile header */}
      <header class="fixed top-0 w-full z-40 bg-white/70 dark:bg-primary/70 backdrop-blur-xl flex justify-between items-center px-6 py-4 lg:hidden">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-[10px] text-white font-bold">
            {initials}
          </div>
          <span class="font-bold tracking-tighter text-2xl text-primary dark:text-surface">
            BudgetWise
          </span>
        </div>
        <button class="text-primary dark:text-surface active:scale-95 duration-200">
          <span class="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </header>

      {/* Desktop header */}
      <header class="sticky top-0 z-40 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-xl hidden lg:flex justify-between items-center w-full px-8 py-4">
        <div class="flex items-center gap-6 flex-1">
          <div class="relative w-full max-w-md">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
            <input
              class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/20 placeholder:text-slate-400"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
            <span class="material-symbols-outlined">help_outline</span>
          </button>
          <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] text-white font-bold ml-2">
            {initials}
          </div>
        </div>
      </header>
    </>
  );
});
