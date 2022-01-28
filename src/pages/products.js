import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import './products.css'

const ProductsPage = ({ data }) => {

	return (
		<Layout>
			<h3>The Ark Store</h3>
			<hr />
			<Layout className="products--layout">
				{data.allShopifyProduct.edges.map(({ node }) => {
					const image = getImage(node.images[0].gatsbyImageData)
					return (
						<Link key={node.shopifyId} to={`/products/${node.handle}`}>
							<article className="products--card" className="card">
								<h5 className="flex">
									<Layout>
									{node.title} 
									</Layout>
									{node.priceRangeV2.minVariantPrice.amount}
								</h5>
								<GatsbyImage image={image} alt={node.title} />
								<section>
								</section>
							</article>
						</Link>
					)
				})}
			</Layout>
		</Layout >
	)
}

export default ProductsPage

export const query = graphql`
{
  allShopifyProduct(sort: {fields: [title]}) {
    edges {
      node {
        title
        shopifyId
        description
        handle
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        images {
          gatsbyImageData
        }
      }
    }
  }
}
`

