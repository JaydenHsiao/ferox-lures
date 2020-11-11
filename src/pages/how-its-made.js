import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './blog.module.css'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class HowItsMade extends React.Component {
  render() {
        <h1>How It's Made</h1>
  }
}

export default HowItsMade

export const pageQuery = graphql`
  query HowItsMadeQuery {
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
