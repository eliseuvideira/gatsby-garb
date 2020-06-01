const { createFilePath } = require('gatsby-source-filesystem')
const { resolve } = require('path')

const PostTemplate = resolve('./src/templates/post-template.js')
const BlogTemplate = resolve('./src/templates/blog-template.js')

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  const perPage = 2
  const totalPages = Math.ceil(posts.length / perPage)
  new Array(totalPages).fill(null).forEach((_, index) => {
    const isFirstPage = index === 0
    const isLastPage = index === totalPages - 1
    const currentPage = index + 1
    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: perPage,
        skip: index * perPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })
}
