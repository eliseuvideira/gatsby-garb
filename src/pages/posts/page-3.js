import React from 'react'
import Layout from '../../components/layout'
import { Link, useStaticQuery } from 'gatsby'

export default function Page3() {
  const data = useStaticQuery(graphql`
    {
      allFile {
        totalCount
        edges {
          node {
            relativePath
            size
            extension
            birthTime
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <h1>Hello from Page 3!</h1>

      <h3>Image File Data</h3>
      <table>
        <thead>
          <tr>
            <td>Relative Path</td>
            <td>Size</td>
            <td>Extension</td>
            <td>Birthtime</td>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(
            ({ node: { relativePath, size, extension, birthTime } }, index) => (
              <tr>
                <td>{relativePath}</td>
                <td>{size}</td>
                <td>{extension}</td>
                <td>{birthTime}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      <Link to="/page-2">Go to page 2</Link>
    </Layout>
  )
}
