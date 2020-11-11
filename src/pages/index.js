import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import Hero from '../components/hero'

class RootIndex extends React.Component {
  // state = {
  //   atTop: true,
  // }
  // componentDidMount() {
  //   document.addEventListener('scroll', () => {
  //     //remove bottom of black gradient if at the bottom of the page (document height minus viewport height minus a bit of buffer)
  //     const atTop = window.scrollY <= 10
  //     if (atTop !== this.state.atTop) {
  //       this.setState({ atTop })
  //     }
  //   })
  // }

  render() {
    // console.log(`at top = ${this.state.atTop}`)
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allContentfulProduct.edges')

    return (
      <>
        <Hero />
        <Layout location={this.props.location}>
          <div style={{ background: '#fff' }} class="px-5 py-8 mx-auto">
            <Helmet title={siteTitle} />
            <section>
              <div>
                <h1 class="mb-6">Our Products</h1>
                <div class="flex flex-wrap -m-4 mb-8">
                  {products.map(({ node }) => {
                    return <ArticlePreview article={node} />
                  })}
                </div>
                <h1 class="mb-6">How It's Made</h1>
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
