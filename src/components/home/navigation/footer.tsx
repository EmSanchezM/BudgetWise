import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { PUBLIC_ROUTES } from "~/lib/constants";

export const Footer = component$(() => {
  return (
    <footer class="max-w-7xl mx-auto px-6 pb-12">
      {/* CTA Section */}
      <section class="mb-12">
        <div class="bg-primary-container rounded-[2.5rem] p-10 lg:p-16 text-center">
          <h3 class="text-white text-3xl lg:text-5xl font-black tracking-tighter mb-4">
            Ready to see where your money goes?
          </h3>
          <p class="text-white/60 text-sm lg:text-base mb-8 max-w-md mx-auto">
            Join thousands tracking their finances with clarity — no ads, no noise, just your data.
          </p>
          <Link
            href={PUBLIC_ROUTES.SIGN_UP}
            class="block w-full sm:inline-block sm:w-auto sm:px-10 bg-white text-primary py-4 rounded-xl font-bold active:scale-95 transition-transform text-center"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Bottom bar */}
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        <p>&copy; {new Date().getFullYear()} BudgetWise</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-primary transition-colors">Privacy</a>
          <a href="#" class="hover:text-primary transition-colors">Terms</a>
          <a href="#" class="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
});
