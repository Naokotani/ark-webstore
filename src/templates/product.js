import React, { useState } from "react"
import { navigate } from "gatsby";
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
	useAddItemToCart,
}
	from "../context/StoreContext"


const ProductTemplate = ({ pageContext }) => {

	const { product } = pageContext

	const variantId = product.variants[0].shopifyId

	const addItemToCart = useAddItemToCart();

	const handleAddItem = () => {
		addItemToCart(variantId, quantity)
		navigate("/products")
	}

	const handleBuy = () => {
		addItemToCart(variantId, quantity)
		navigate("/checkout")
	}


	const handleChange = e => {
		setQuantity(e.target.value)
	}

	const [quantity, setQuantity] = useState(1);
	const image = getImage(product.featuredImage.gatsbyImageData)

	console.log(product)
	return (
		<Layout>
			<section className="product grid aside-left">
				<aside className="card">
					{image &&
						<GatsbyImage
							image={image}
							alt={product.title} />
					}
				</aside>
				<article>
					<h1 className="flex">
						<span>{product.title}</span>
						<span className="header-price">
							${product.priceRangeV2.maxVariantPrice.amount}
						</span>
					</h1>
					<div>{product.description}</div>
					<form>
						<label>
							Quantity:
							<select
								name="quanitity"
								value={quantity}
								onChange={e => handleChange(e)}>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
							</select>
						</label>
					</form>
					<button
						onClick={() => handleBuy()}>
						Buy
					</button>
					<button
						onClick={() => handleAddItem()}>
						Add to Cart
					</button>
				</article>
			</section>
		</Layout >
	)
}

export default ProductTemplate



