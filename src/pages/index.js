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

    //find og:image url
    const og = get(this, 'props.data.allContentfulAsset.edges')
    let og_url
    og.map((node) => {
      //query for image url, TIL you have to add http: so open graph image is accepted
      og_url = `http:${node.node.file.url}`
    })

    return (
      <>
        <Hero />
        <Layout location={this.props.location}>
          <div style={{ background: '#fff' }} className="px-5 py-8 mx-auto">
            <Helmet title={siteTitle} htmlAttributes={{ lang: 'en' }}>
              {/* og:url, og:type, og:title, og:description, fb:app_id */}
              {/* for Open Graph crawling! */}
              <meta name="og:title" content={`${siteTitle}`} />
              <meta
                name="og:description"
                content="Online store for Ferox Lures' hand crafted lures"
              />
              <meta name="og:url" content={`${this.props.location.href}`} />
              <meta property="og:image" content={`${og_url}`} />
              <meta property="og:type" content="website" />
              <meta
                property="og:image:alt"
                content="Ferox Lures' logo and a picture of some lures"
              />
            </Helmet>
            <div className="space-y-8">
              <section>
                <h2 className="mb-6">Our Products</h2>
                <div className="flex flex-wrap -m-4 mb-4">
                  {products.map(({ node }, index) => {
                    return <ArticlePreview article={node} key={index} />
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
    # Query Open Graph (social media preview) image from Contentful
    allContentfulAsset(filter: { title: { eq: "og:image" } }) {
      edges {
        node {
          file {
            url
          }
        }
      }
    }
  }
`
