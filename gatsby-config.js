require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Ferox Lures',
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss')('./tailwind.config.js')],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: { tailwind: true },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lato:400,600', 'Lato'],
        },
        custom: {
          families: ['Raleway Modified'],
          urls: ['fonts.css'],
        },
      },
    },
  ],
}

// @font-face {
//   font-family: 'Raleway Modified';
//   src: url('/raleway-modified-regular.ttf') format('truetype')
//       font-weight-normal,
//     url('/raleway-modified-bold.ttf') format('truetype') font-weight-bold;
// }
