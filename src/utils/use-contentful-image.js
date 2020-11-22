// lets us use gatsby-image with rich text rendering
import { graphql, useStaticQuery } from 'gatsby'

//given an assetUrl...
export default (assetUrl) => {
  //and after querying all the assets in the Contentful space...
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query CONTENTFUL_IMAGE_QUERY {
        allContentfulAsset {
          nodes {
            file {
              url
            }
            fluid(maxWidth: 1000, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    `
  )
  //return the fluid WebP url that matches that assetUrl
  return allContentfulAsset.nodes.find((n) => n.file.url === assetUrl).fluid
}
