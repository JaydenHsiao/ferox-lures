const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulProduct {
              edges {
                node {
                  name
                  url
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulProduct.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/${post.node.url}/`,
            component: blogPost,
            context: {
              url: post.node.url,
            },
          })
        })
      })
    )
  })
}
