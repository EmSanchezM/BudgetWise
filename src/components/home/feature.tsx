import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const Feature = component$(() => {
  useStylesScoped$(`
    li.custom-list:before {
      content: "\x2022";
      text-indent: -9999999px;
      width: .4em;
      height: 1em;
      background-repeat: no-repeat;
      background-size: .4em .7em;
      background-position: 0 .3em;
      font-size: 300%;
      top: -.35em;
      position: absolute;
      display: block
    }

    li.circle-check:before {
      background-image: url(./checklist.svg);
      left: -.7em;
      top: -.4em
    }
  `);

  return (
    <section class="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto" id="feature">
      <div class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <div class="flex w-full justify-end">
          <div class="h-full w-full p-4">
            <img src="./budget-wise.jpg" width={612} height={383} alt="BudgetWise Ilustration" />
          </div>
        </div>
        <div class="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12">
          <h3 class="text-3xl lg:text-4xl font-medium leading-relaxed text-black">
            We Provide Many Features You Can Use
          </h3>
          <p class="my-2 text-black-500">
            You can explore the features that we provide with fun and have their
            own functions each feature.
          </p>
          <ul class="text-black self-start list-inside ml-8">
            <li class="relative circle-check custom-list">Easy to use interface.</li>
            <li class="relative circle-check custom-list">Track your income & expenses.</li>
            <li class="relative circle-check custom-list">Customize your own categories.</li>
            <li class="relative circle-check custom-list">Worldwide currencies.</li>
            <li class="relative circle-check custom-list">We're there for you 24/7.</li>
          </ul>
        </div>
      </div>
    </section>
  )
})