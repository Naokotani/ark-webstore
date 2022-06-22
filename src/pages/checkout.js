import React, { useState, useEffect } from "react";
import {
	useCartItems,
	useCheckout,
	useCartTotals,
	useRemoveItemFromCart,
	useAddItemToCart,
}
	from "../context/StoreContext";
import Layout from "../components/Layout";

const Checkout = () => {

	const checkout = useCheckout();
	const cartItems = useCartItems();
	const totals = useCartTotals();
	const removeItem = useRemoveItemFromCart();
	const addItem = useAddItemToCart();

	const [quantity, setQuantity] = useState(1);

	console.log(totals)
	console.log(cartItems)

	const handleCheckout = () => {
		checkout();
	}

	const handleRemove = (id) => {
		removeItem(id);

	}

	const handleQuantity = (id) => {
		const q = parseInt(quantity)
		removeItem(id);
		addItem(id, q)
	}

	return (
		<Layout>
			<h1 className="underline">Your Cart</h1>
			{!cartItems &&
				<h1>Your Cart is Empty</h1>
			}
			{cartItems &&
			<table>
				<thead>
					<tr>
						<th className="border">Item</th>
						<th className="border">quantity</th>
						<th className="border">price</th>
					</tr>
				</thead>
				{cartItems.map(item => (
					<tbody>
						<tr>
							<td className="border">{item.title}</td>
							<td className="number border">{item.quantity}</td>
							<td className="number border">{item.variant.priceV2.amount}</td>
							<td key={item.id}>
								<button
									onClick={() => handleRemove(item.id)}>
									Remove</button>
							</td>
						</tr>
					</tbody>
				))}
			</table>
			}
			<p>Subtotal: {totals.total}</p>
			<button onClick={() => handleCheckout()}>Checkout</button>
		</Layout>
	)
}

export default Checkout;
