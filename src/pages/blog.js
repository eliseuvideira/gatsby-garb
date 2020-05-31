import React from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql } from 'gatsby'

export default function Blog() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        totalCount
        edges {
          node {
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
  `)

  console.log(data)

  return (
    <Layout>
      <div>
        <h1 style={{ display: 'inlineBlock', borderBottom: '1px solid' }}>
          Gatsby Garb Blog
        </h1>
        <h4>Posts: {data.allMarkdownRemark.totalCount}</h4>
        {data.allMarkdownRemark.edges.map(
          ({
            node: {
              id,
              frontmatter: { title, date },
              excerpt,
            },
          }) => (
            <div key={id}>
              <h3>
                {title} <span style={{ color: '#ccc' }}>{date}</span>
              </h3>
              <p>{excerpt}</p>
            </div>
          ),
        )}
      </div>
    </Layout>
  )
}
