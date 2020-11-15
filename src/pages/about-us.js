import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
class AboutUs extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }} class="px-5 py-8 mx-auto mt-10">
          <Helmet title={`About Us | ${siteTitle}`} />
          <h1>About Us</h1>
        </div>
      </Layout>
    )
  }
}

export default AboutUs

export const pageQuery = graphql`
  query AboutUsQuery {
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
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
