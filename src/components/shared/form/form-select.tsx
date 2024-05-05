import { component$ } from "@builder.io/qwik";

interface FormSelectProps {
  id: string;
  name: string;
  hasError: boolean;
  items: { id: number | string; name: string; }[];
}

export const FormSelect = component$<FormSelectProps>(({ id, name, hasError, items }) => {
  return (
    <select
      name={name}
      id={id}
      class={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${hasError ? 'focus:ring-red-600 border-red-500 ring-red-500 placeholder:text-gray-400' : 'focus:ring-indigo-600 ring-gray-300 placeholder:text-gray-400'}`}
    >
      {
        items.map((item) => {
          return (
            <option value={item.id}>{item.name}</option>
          )
        })
      }
    </select>
  )
})