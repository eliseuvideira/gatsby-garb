import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'

export default function Blog({ data, pageContext }) {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext

  const nextPage = `/blog/${currentPage + 1}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`

  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1px solid' }}>
          Gatsby Garb Blog
        </h1>
        <h4>Posts: {data.allMarkdownRemark.totalCount}</h4>
        <section>
          {data.allMarkdownRemark.edges.map(
            ({
              node: {
                id,
                frontmatter: { title, date },
                excerpt,
                fields: { slug },
              },
            }) => (
              <div key={id}>
                <h3>
                  <Link to={`posts${slug}`}>{title}</Link>{' '}
                  <span style={{ color: '#ccc' }}>{date}</span>
                </h3>
                <p>{excerpt}</p>
              </div>
            ),
          )}
        </section>
        <section
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 300,
            margin: '0 auto',
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Previous Page
            </Link>
          )}
          {new Array(totalPages).fill(null).map((_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`
