import { component$ } from "@builder.io/qwik";
import { FormSelect } from "./form-select";

interface FormGroupProps {
  labelName: string;
  id: string;
  name: string;
  type: string;
  errors?: string[] | undefined;
  items?: { id: number | string; name: string; }[]
}

export const FormGroup = component$<FormGroupProps>(({ labelName, id, name, type, items, errors }) => {
  const hasError = errors ? true : false;
  const errorMessage = hasError && errors ? errors.join(', ') : '';

  return (
    <div>
      <label for={name} class="block text-sm font-medium leading-6 text-gray-900">{labelName}</label>
      <div class="mt-2">
        {
          type === 'select' ? (
            <FormSelect id={id} name={name} hasError={hasError} items={items ?? []} />
          )
            :
            (
              <input
                id={id}
                name={name}
                type={type}
                class={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${hasError ? 'focus:ring-red-600 border-red-500 ring-red-500 placeholder:text-gray-400' : 'focus:ring-indigo-600 ring-gray-300 placeholder:text-gray-400'}`}
              />
            )
        }
        {
          hasError && (
            <p class="text-red-500 text-xs italic">{errorMessage}</p>
          )
        }
      </div>
    </div>
  )
});