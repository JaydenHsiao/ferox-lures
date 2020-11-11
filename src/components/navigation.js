import React from 'react'
import { Link } from 'gatsby'

import Wordmark from '../../static/wordmark.svg'
import Menu from '../../static/menu.svg'

const links = ['Shop', 'About', "How It's Made"]

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const [atTop, setAtTop] = React.useState(true)

  document.addEventListener('scroll', () => {
    //scroll listener to detect when to change background
    setAtTop(window.scrollY <= 40)
  })

  return (
    <>
      <nav
        className={`py-3 z-10 fixed w-full top-0 transition-colors duration-200 ease-in-out ${
          atTop ? null : 'bg-gray-800'
        }`}
      >
        <div
          style={{ maxWidth: 1180, margin: '0 auto' }}
          class="relative flex flex-wrap items-center justify-between px-5"
        >
          <div class="flex flex-wrap flex-row items-center text-white w-full">
            <div class="w-1/3 inline-flex lg:justify-end">
              {' '}
              <button
                className="lg:hidden"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <img src={Menu} alt="Hamburger menu icon" class="h-8" />
              </button>
            </div>
            <div class="flex lg:order-none w-1/3 items-center text-gray-900 lg:items-center lg:justify-center">
              <div class="mx-auto">
                <Link to={'/'}>
                  <img
                    src={Wordmark}
                    alt="Ferox Lures logo"
                    class="h-6 my-auto"
                  />
                </Link>
              </div>
            </div>
            <nav class="lg:w-1/3 hidden lg:block">
              <div class="flex flex-col items-end">
                <div class="space-x-6">
                  {links.map((link, index) => {
                    return (
                      <Link to={`/${link}`} key={index}>
                        <span class="callout text-xl">{link}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </nav>
          </div>
          <div
            className={
              'lg:hidden flex-grow items-center ml-auto' +
              (navbarOpen ? ' flex' : ' hidden')
            }
          >
            <ul className="flex flex-col py-4 text-white font-semibold space-x-0 space-y-4">
              {links.map((link, index) => {
                return (
                  <Link to={`/${link}`} key={index}>
                    <span class="callout text-xl">{link}</span>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
