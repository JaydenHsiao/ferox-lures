import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import emailjs from 'emailjs-com'

import Layout from '../components/layout'
import Close from '../../static/close.svg'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function ProductTemplate(props) {
  const product = get(props, 'data.contentfulProduct')
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const [modalOpen, setModalOpen] = useState(false)

  function sendEmail(e) {
    e.preventDefault()
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICEID,
        process.env.REACT_APP_EMAILJS_TEMPLATEID,
        //TIL - you can just drill down an event like a JSON object LOL
        {
          productName: `${product.name}`,
          quantity: e.target.quantity.value,
          customerEmail: e.target.customerEmail.value,
          total: `$${product.priceCad.toFixed(2)} x ${
            e.target.quantity.value
          } = $${(product.priceCad * e.target.quantity.value).toFixed(2)} CAD`,
          notes: e.target.notes.value,
        },
        process.env.REACT_APP_EMAILJS_USERID
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  const Modal = ({ handleClose, show, product }) => {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full ${
          show ? 'block' : 'hidden'
        }`}
        style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      >
        <section
          className="fixed bg-white w-11/12 centered mt-5"
          style={{ maxHeight: '85vh' }}
        >
          <button onClick={handleClose} class="mt-4 w-full">
            <img src={Close} alt="Close icon" class="h-8 ml-auto mr-4" />
          </button>
          <section class="text-gray-700 body-font relative">
            <div class="px-6 pb-10 mx-auto">
              <div class="flex flex-col text-center w-full mb-4">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Contact Us
                </h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Whatever cardigan tote bag tumblr hexagon brooklyn
                  asymmetrical gentrify.
                </p>
              </div>
              <div class="lg:w-1/2 md:w-2/3 mx-auto">
                <form class="flex flex-wrap -m-2" onSubmit={sendEmail}>
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
                        defaultValue={`${product}`}
                        disabled
                        class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div class="p-2 w-1/4">
                    <label
                      for="product"
                      class="leading-7 text-sm text-gray-600"
                    >
                      Qty
                    </label>
                    <div class="relative">
                      <select
                        class="block appearance-none w-full bg-gray-100 border border-gray-300 focus:border-indigo-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight"
                        name="quantity"
                      >
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
                      <label
                        for="email"
                        class="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="customerEmail"
                        class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div class="p-2 w-full">
                    <div class="relative">
                      <label
                        for="notes"
                        class="leading-7 text-sm text-gray-600"
                      >
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 lg:h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </div>
                  </div>
                  <div class="p-2 w-full">
                    <button
                      type="submit"
                      class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      </div>
    )
  }

  return (
    <>
      <Layout>
        <div class="mt-20" style={{ background: '#fff' }}>
          <Helmet title={`${product.name} | ${siteTitle}`} />
          <div class="lg:w-4/5 mx-auto flex flex-wrap mb-12 px-5">
            <a class="block relative overflow-hidden rounded-2xl md:w-1/2 w-full h-full mb-4">
              <Img
                alt="ecommerce"
                fluid={product.thumbnail.fluid}
                style={{ maxHeight: '100%' }}
                imgStyle={{ objectFit: 'cover' }}
              />
            </a>
            <div class="md:w-1/2 w-full md:pl-10 md:my-auto">
              <h1 class="mb-2">{product.name}</h1>
              <div className="leading-relaxed mb-4 space-y-4">
                {/* Hello */}
                {documentToReactComponents(product.longerDescription.json)}
              </div>
              <div class="flex items-center">
                <p>${product.priceCad.toFixed(2)} CAD</p>
                <button
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 rounded"
                  onClick={() => setModalOpen(true)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={modalOpen}
            handleClose={() => setModalOpen(false)}
            product={product.name}
            // sendEmail={this.sendEmail}
          />
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ProductBySlug($url: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulProduct(url: { eq: $url }) {
      name
      description
      size
      updatedAt
      priceCad
      url
      thumbnail {
        fluid(maxWidth: 420) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      longerDescription {
        json
      }
    }
  }
`
