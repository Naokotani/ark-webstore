import React, { useState } from "react"
import { navigate } from "gatsby";
import StoreContext, {
	StoreContextProvider,
	useAddItemToCart,
	useCartItems,
	useCartCount,
	useCheckout
}
	from "../context/StoreContext"

import Layout from "../components/Layout"



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
						onChange={e => handleChange(e)}
					>
						<option value={1}>One</option>
						<option value={2}>Two</option>
						<option value={3}>Three</option>
						<option value={4}>Four</option>
						<option value={5}>Five</option>
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


