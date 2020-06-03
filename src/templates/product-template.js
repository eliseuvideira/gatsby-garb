import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const ProductTemplate = ({
  data: {
    contentfulProduct: { slug, name, price, description, createdAt, image },
  },
  location,
}) => (
  <Layout>
    <div style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <h2>
        {name} - <span style={{ color: '#ccc' }}>Added on {createdAt}</span>
      </h2>
      <h4>${price}</h4>
      <p>{description}</p>
      <button
        style={{
          backgroundColor: 'darkorange',
          color: 'white',
          padding: '0.3em',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        className="snipcart-add-item"
        data-item-id={slug}
        data-item-price={price}
        data-item-image={image.file.url}
        data-item-name={name}
        data-item-url={location.pathname}
      >
        Add to Cart
      </button>
      <Img style={{ margin: '0 auto', maxWidth: 600 }} fluid={image.fluid} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      slug
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY")
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`

export default ProductTemplate
