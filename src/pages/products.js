import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import StoreContext, {
	useCartTotals,
}
	from "../context/StoreContext"
import './products.css'

const ProductsPage = ({ data }) => {
	const total = useCartTotals();

	return (
		<Layout>
			<h3 className="flex">
				<span>The Ark Store</span>
				{total.total !== "$0.00" &&
					<span>
						subtotal: {total.total}
					</span>
				}
			</h3>
			<hr />
			<ul className="products--layout">
				{data.allShopifyProduct.edges.map(({ node }) => {
					const image = getImage(node.featuredImage.gatsbyImageData)
					return (
						<Link key={node.shopifyId} to={`/products/${node.handle}`}>
							<li className="products--card card">
								<GatsbyImage image={image} alt={node.title} />
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

