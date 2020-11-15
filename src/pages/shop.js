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
      <>
        <Layout location={this.props.location}>
          <div
            style={{ background: '#fff' }}
            className="px-5 py-8 mx-auto mt-10"
          >
            <Helmet title={`Shop | ${siteTitle}`} />
            <section>
              <div>
                <h1 className="mb-6">Shop</h1>
                <div className="flex flex-wrap -m-4 mb-8">
                  {products.map(({ node }) => {
                    return <ArticlePreview article={node} />
                  })}
                </div>
                {/* <h1 className="mb-6">How It's Made</h1> */}
              </div>
            </section>
          </div>
        </Layout>
      </>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query ShopQuery {
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
          url
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
