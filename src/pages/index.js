import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import Hero from '../components/hero'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allContentfulProduct.edges')
    const images = get(this, 'props.data.contentfulHowItsMade.images')

    return (
      <>
        <Hero />
        <Layout location={this.props.location}>
          <div style={{ background: '#fff' }} className="px-5 py-8 mx-auto">
            <Helmet title={siteTitle} htmlAttributes={{ lang: 'en' }}>
              <meta
                name="description"
                content="Online store for Ferox Lures' hand crafted lures"
              />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            <div className="space-y-8">
              <section>
                <h2 className="mb-6">Our Products</h2>
                <div className="flex flex-wrap -m-4 mb-4">
                  {products.map(({ node }, index) => {
                    return <ArticlePreview article={node} />
                  })}
                </div>
                <Link to={'shop'}>
                  <button class="flex mx-auto text-white bg-primary border-0 py-2 px-6 rounded text-lg">
                    View All Products
                  </button>
                </Link>
              </section>
              <section>
                <h2 className="mb-6">How It's Made</h2>
                <div class="flex flex-wrap z-10 connector-line -mx-2 mb-6">
                  {images.map(({ fluid, title, description }, index) => {
                    return (
                      <div
                        class={`md:w-1/4 md:px-2 w-full p-2 ${
                          index % 2 === 1 ? 'ml-auto' : ''
                        }`}
                        key={index}
                      >
                        <div class="bg-gray-100 p-6 rounded-2xl">
                          <Img
                            alt={description}
                            fluid={fluid}
                            style={{ maxHeight: '100%' }}
                            className="object-cover rounded-2xl mb-4"
                          />
                          <div class="flex">
                            <h3 class="font-bold mr-4">{(index += 1)}.</h3>
                            <span class="lg:text-large sm:caption text-gray-900 w-3/4">
                              {title}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Link to={'how-its-made'}>
                  <button class="flex mx-auto text-white bg-primary border-0 py-2 px-6 rounded text-lg">
                    View How It's Made
                  </button>
                </Link>
              </section>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulProduct(
      sort: { fields: [updatedAt], order: DESC }
      filter: { onHomepage: { eq: true } }
    ) {
      edges {
        node {
          name
          description
          size
          updatedAt
          priceCad
          url
          thumbnail {
            fluid(maxWidth: 160) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    contentfulHowItsMade {
      images {
        title
        description
        fluid(maxWidth: 280) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
