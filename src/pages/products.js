import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
	useCartTotals,
}
	from "../context/StoreContext"

const ProductsPage = ({ data }) => {
	const total = useCartTotals();

	return (
		<Layout>
			<header className="product">
				<h1 className="flex">
					<span>The Ark Store</span>
					{total.total !== "$0.00" &&
						<span className="header-price">
							subtotal: {total.total}
						</span>
					}
				</h1>
			</header>
			<ul className="products--layout">
				{data.allShopifyProduct.edges.map(({ node }) => {
					const image = getImage(node.featuredImage.gatsbyImageData)
					return (
						<Link key={node.shopifyId} to={`/products/${node.handle}`}>
							<li className="products--card card">
								<GatsbyImage image={image} alt="" />
								<header className="flex">
									<h3 >
										{node.title}
									</h3>
									<aside>
										{node.priceRangeV2.minVariantPrice.amount}
									</aside>
								</header>
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
				featuredImage {
					gatsbyImageData
				}
        shopifyId
        description
        handle
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
}
`

