import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

class ProductTemplate extends React.Component {
  render() {
    const product = get(this.props, 'data.contentfulProduct')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const document = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Hello world!',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }

    return (
      <>
        <Layout location={this.props.location}>
          <div style={{ background: '#fff' }}>
            <Helmet title={`${product.name} | ${siteTitle}`} />
            {/* <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div> */}
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
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
                  <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 rounded">
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}

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
