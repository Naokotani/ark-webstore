import React, { useState } from "react"
import { navigate } from "gatsby";
import Layout from "../components/Layout"
import Figure from "../components/Figure"
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

	return (
		<Layout>
			<h1>{product.title}</h1>
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
		</Layout >
	)
}

export default ProductTemplate


