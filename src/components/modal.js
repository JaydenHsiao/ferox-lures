import React from 'react'

function Modal(handleClose, show, product) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full ${
        show ? 'block' : 'hidden'
      }`}
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
    >
      <section className="fixed bg-white w-11/12 centered">
        <section class="text-gray-700 body-font relative">
          <div class="px-6 py-10 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact Us
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify.
              </p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-3/4">
                  <div class="relative">
                    <label
                      for="product"
                      class="leading-7 text-sm text-gray-600"
                    >
                      Product
                    </label>
                    <input
                      type="text"
                      id="product"
                      name="product"
                      value={`${product}`}
                      disabled
                      class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-1/4">
                  <label for="product" class="leading-7 text-sm text-gray-600">
                    Qty
                  </label>
                  <div class="relative">
                    <select class="block appearance-none w-full bg-gray-100 border border-gray-300 focus:border-indigo-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="notes" class="leading-7 text-sm text-gray-600">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  )
}

export default Modal
