import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const Products = ({ data: { allContentfulProduct } }) => (
  <Layout>
    <h2>Garb Products</h2>
    <div>
      {allContentfulProduct.edges.map(({ node: product }) => (
        <div key={product.id}>
          <Link to={`/products/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>
          <Img style={{ maxWidth: 400 }} fluid={product.image.fluid} />
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          name
          description
          slug
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Products
