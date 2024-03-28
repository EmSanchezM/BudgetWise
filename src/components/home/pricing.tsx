import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { ButtonOutline } from "../shared";

export const Pricing = component$(() => {
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
  
    li.check:before {
      left: -.5em;
      background-image: url(./jam_check.svg);
      top: -.5em;
      font-size: 400%
    }
  `);

  return (
    <section class="bg-gradient-to-b from-white-300 to-white-500 w-full py-14" id="pricing">
      <div class="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div class="flex flex-col w-full">
          <div>
            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">Choose Your Plan</h3>
            <p class="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center">
              Let's choose the package that is best for you and explore it happily
              and cheerfully.
            </p>
          </div>
          <div class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            <article class="flex justify-center">
              <main class="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
                <div class="p-4 lg:p-0 mt-6 lg:mt-16">
                  <img src="./Free.png" width={145} height={165} alt="Free Plan" />
                </div>
                <p class="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                  Free Plan
                </p>
                <ul class="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                  <li class="relative check custom-list my-2">
                    Unlimited Bandwitch
                  </li>
                  <li class="relative check custom-list my-2">
                    Encrypted Connection
                  </li>
                  <li class="relative check custom-list my-2">
                    No Traffic Logs
                  </li>
                  <li class="relative check custom-list my-2">
                    Works on All Devices
                  </li>
                </ul>
                <div class="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p class="text-2xl text-black-600 text-center mb-4 ">
                    Free
                  </p>
                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </main>
            </article>
            <article class="flex justify-center">
              <main class="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
                <div class="p-4 lg:p-0 mt-6 lg:mt-16">
                  <img src="./Standard.png" width={145} height={165} alt="Standard Plan" />
                </div>
                <p class="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                  Standard Plan
                </p>
                <ul class="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                  <li class="relative check custom-list my-2">
                    Unlimited Bandwitch
                  </li>
                  <li class="relative check custom-list my-2">
                    Encrypted Connection
                  </li>
                  <li class="relative check custom-list my-2">
                    No Traffic Logs
                  </li>
                  <li class="relative check custom-list my-2">
                    Works on All Devices
                  </li>
                </ul>
                <div class="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p class="text-2xl text-black-600 text-center mb-4 ">
                    Standard
                  </p>
                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </main>
            </article>
            <article class="flex justify-center">
              <main class="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
                <div class="p-4 lg:p-0 mt-6 lg:mt-16">
                  <img src="./Premium.png" width={145} height={165} alt="Premium Plan" />
                </div>
                <p class="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
                  Premium Plan
                </p>
                <ul class="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
                  <li class="relative check custom-list my-2">
                    Unlimited Bandwitch
                  </li>
                  <li class="relative check custom-list my-2">
                    Encrypted Connection
                  </li>
                  <li class="relative check custom-list my-2">
                    No Traffic Logs
                  </li>
                  <li class="relative check custom-list my-2">
                    Works on All Devices
                  </li>
                </ul>
                <div class="flex flex-col w-full justify-center mb-8 flex-none mt-12">
                  <p class="text-2xl text-black-600 text-center mb-4 ">
                    Premium
                  </p>
                  <ButtonOutline>Select</ButtonOutline>
                </div>
              </main>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
})