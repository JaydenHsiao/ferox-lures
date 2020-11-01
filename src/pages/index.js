import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allContentfulProduct.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <section>
            <div class="container px-5 py-8 mx-auto">
              <h1 class="mb-6">Our Products</h1>
              <div class="flex flex-wrap -m-4">
                {products.map(({ node }) => {
                  return <ArticlePreview article={node} />
                })}
              </div>
            </div>
          </section>
        </div>
      </Layout>
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
    allContentfulProduct(sort: { fields: [updatedAt], order: DESC }) {
      edges {
        node {
          name
          description
          size
          updatedAt
          priceCad
          thumbnail {
            fluid(maxWidth: 420) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
