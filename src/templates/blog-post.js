import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
// import Modal from '../components/modal'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
class ProductTemplate extends React.Component {
  state = { show: false }

  showModal = () => {
    this.setState({ show: true })
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  render() {
    const product = get(this.props, 'data.contentfulProduct')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <>
        <Layout location={this.props.location}>
          <div style={{ background: '#fff' }}>
            <Helmet title={`${product.name} | ${siteTitle}`} />
            <div class="lg:w-4/5 mx-auto flex flex-wrap mt-20 mb-12 px-5">
              <a class="block relative overflow-hidden rounded-2xl lg:w-1/2 w-full h-full mb-4">
                <Img
                  alt="ecommerce"
                  fluid={product.thumbnail.fluid}
                  style={{ maxHeight: '100%' }}
                  imgStyle={{ objectFit: 'cover' }}
                />
              </a>
              <div class="lg:w-1/2 w-full lg:pl-10 lg:my-auto">
                <h1 class="mb-2">{product.name}</h1>
                <div className="leading-relaxed mb-4 space-y-4">
                  {/* Hello */}
                  {documentToReactComponents(product.longerDescription.json)}
                </div>
                <div class="flex items-center">
                  <p>${product.priceCad.toFixed(2)} CAD</p>
                  <button
                    class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 rounded"
                    onClick={this.showModal}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
            {/* <Modal show={this.state.show} handleClose={this.hideModal}>
              <p>Modal</p>
              <p>Data</p>
            </Modal> */}
          </div>
        </Layout>
      </>
    )
  }
}

// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'modal d-block' : 'modal d-none'

//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main">
//         {children}
//         <button onClick={handleClose}>close</button>
//       </section>
//     </div>
//   )
// }

export default ProductTemplate

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
