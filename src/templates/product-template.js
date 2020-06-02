import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductTemplate = ({
  data: {
    contentfulProduct: { name, price, description, createdAt, image },
  },
}) => (
  <Layout>
    <div style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <h2>
        {name} - <span style={{ color: '#ccc' }}>Added on {createdAt}</span>
      </h2>
      <h4>${price}</h4>
      <p>{description}</p>
      <Img style={{ margin: '0 auto', maxWidth: 600 }} fluid={image.fluid} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY")
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default ProductTemplate
