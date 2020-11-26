import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import useContentfulImage from '../utils/use-contentful-image'

export default function HowItsMade(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const content = get(props, 'data.contentfulHowItsMade.fullContent.json')

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target.fields
        const { file, description, title } = asset
        const fluid = useContentfulImage(file['en-US'].url)

        return (
          <div className="full-bleed">
            <Img
              title={title['en-US']}
              className="rounded mb-3"
              fluid={fluid}
              alt={description['en-US']}
            />
            <p class="leading-relaxed text-center text-gray-600 caption">
              {title['en-US']}
            </p>
          </div>
        )
      },
    },
  }

  return (
    <Layout>
      <div style={{ background: '#fff' }} class="mt-10 py-8 px-5">
        <Helmet title={`How It's Made | ${siteTitle}`} />

        <div className="leading-relaxed mb-4 space-y-6 wrapper">
          <h1>How It's Made</h1>
          {documentToReactComponents(content, options)}
        </div>
      </div>
    </Layout>
  )
}

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
    contentfulHowItsMade {
      fullContent {
        json
      }
    }
  }
`
