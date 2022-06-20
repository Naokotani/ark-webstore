import React from "react"
import {
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
	const cartItems = useCartItems();
	const cartCount = useCartCount();
	const checkout = useCheckout();

	const handleAddItem = () => {
		addItemToCart(variantId, 1)
	}

	const handleCheckCart = () => {
		console.log(cartCount)
	}

	const handleCheckout = () => {
		checkout()
	}

	return (
		<Layout>
			<h1>{product.title}</h1>
			<div>{product.description}</div>
			<button
				onClick={() => handleAddItem()}>
				buy
			</button>
			<button onClick={() => handleCheckCart()}>items</button>
			<button onClick={() => handleCheckout()}>Checkout</button>
		</Layout>
	)
}

export default ProductTemplate
					// <button
					// 	className=""
					// 	onClick={() => }>BUY</button>


