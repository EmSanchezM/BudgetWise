import { component$ } from "@builder.io/qwik";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = component$<ErrorMessageProps>(({ message }) => {
  return (
    <div class="rounded-md bg-red-50 p-4">
      <p class="text-sm text-red-700">{message}</p>
    </div>
  );
});
