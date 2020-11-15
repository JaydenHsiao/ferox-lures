import React from 'react'
import { Link } from 'gatsby'

import Wordmark from '../../static/wordmark.svg'
import Menu from '../../static/menu.svg'

const links = [
  { text: 'Home', url: '' },
  { text: 'Shop', url: 'shop' },
  { text: 'About', url: 'about' },
  { text: "How It's Made", url: 'how-its-made' },
]

export default function Navbar() {
  //by wrapping Navbar in a util that only renders it's children after component has mounted, we can use window/document :)
  //(Navbar is just replaced by null elem until mount in lifecycle)
  //great explanation here: https://joshwcomeau.com/react/the-perils-of-rehydration/#two-pass-rendering :)
  const url = window.location.href
  var parser = document.createElement('a')
  parser.href = `${url}`

  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const [atTop, setAtTop] = React.useState(parser.pathname === '/')

  document.addEventListener('scroll', () => {
    //if still in top quarter of viewport AND on the homepage, keep navbar transparent
    setAtTop(
      window.scrollY <= window.innerHeight * 0.25 && parser.pathname === '/'
    )
  })

  return (
    <>
      <nav
        className={`py-3 mb-4 z-10 fixed w-full top-0 transition-colors duration-200 ease-in-out ${
          atTop ? null : 'bg-gray-800'
        }`}
      >
        <div
          style={{ maxWidth: 1180, margin: '0 auto' }}
          className="relative flex flex-wrap items-center justify-between px-5"
        >
          <div className="flex flex-wrap flex-row items-center text-white w-full">
            <div className="w-1/3 inline-flex lg:justify-end">
              {' '}
              <button
                className="lg:hidden"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <img src={Menu} alt="Hamburger menu icon" className="h-8" />
              </button>
            </div>
            <div className="flex lg:order-none w-1/3 items-center text-gray-900 lg:items-center lg:justify-center">
              <div className="mx-auto">
                <Link to={'/'}>
                  <img
                    src={Wordmark}
                    alt="Ferox Lures logo"
                    className="h-6 my-auto"
                  />
                </Link>
              </div>
            </div>
            <nav className="lg:w-1/3 hidden lg:block">
              <div className="flex flex-col items-end">
                <div className="space-x-6">
                  {links.map((link, index) => {
                    return (
                      <Link to={`/${link.url}`} key={index}>
                        <span className="callout text-xl">{link.text}</span>
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
                  <Link to={`/${link.url}`} key={index}>
                    <span className="callout text-xl">{link.text}</span>
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
