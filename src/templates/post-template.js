import React from 'react'
import Layout from '../components/layout'

export default function PostTemplate({ data: post }) {
  return (
    <Layout>
      <div>
        <h1>{post.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
