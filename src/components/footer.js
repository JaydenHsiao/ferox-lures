import React from 'react'
import Facebook from '../../static/facebook.svg'
import Instagram from '../../static/instagram.svg'

export default () => (
  <div class="py-8 mx-auto bg-gray-300">
    <div style={{ maxWidth: 1180, margin: '0 auto' }} class="flex px-5">
      <div class="w-3/5 caption space-y-1">
        <p class="font-semibold">Be the first</p>
        <p>Want high quality lures crafted carefully by hand? </p>
        <p>
          Follow us on Facebook or Instagram to receive our latest products and
          updates!
        </p>
      </div>
      <div class="w-2/5 flex space-x-4 my-auto">
        <a
          href="https://www.facebook.com/FEROX-lures-102729374937442/"
          class="ml-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} alt="Facebook logo" class="w-10" />
        </a>
        <a
          href="https://www.instagram.com/feroxlures/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="Instagram logo" class="w-10" />
        </a>
      </div>
    </div>
  </div>
)
