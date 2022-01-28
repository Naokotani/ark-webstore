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
			<ul className="products--layout">
				{data.allShopifyProduct.edges.map(({ node }) => {
					const image = getImage(node.images[0].gatsbyImageData)
					return (
						<Link key={node.shopifyId} to={`/products/${node.handle}`}>
							<li className="products--card card">
								<header className="flex">
									<h5 >
										{node.title}
									</h5>
									<aside>
										{node.priceRangeV2.minVariantPrice.amount}
									</aside>
								</header>
								<GatsbyImage image={image} alt={node.title} />
								<section>
								</section>
							</li>
						</Link>
					)
				})}
			</ul>
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

