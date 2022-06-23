import React, { useState, useEffect } from "react";
import {
	useCartItems,
	useCheckout,
	useCartTotals,
	useRemoveItemFromCart,
	useAddItemToCart,
	useUpdateItem,
}
	from "../context/StoreContext";
import Layout from "../components/Layout";

const Checkout = () => {

	const checkout = useCheckout();
	const cartItems = useCartItems();
	const totals = useCartTotals();
	const removeItem = useRemoveItemFromCart();
	const addItem = useAddItemToCart();
	const updateItem = useUpdateItem();


	const [quantity, setQuantity] = useState({});


	const handleCheckout = () => {
		checkout();
	}

	const handleUpdate = (checkoutId, value) => {
		setQuantity({ ...quantity, [checkoutId]: value })
		const lineItemsToUpdate = [
			{ id: checkoutId, quantity: parseInt(value) }
		];
		updateItem(checkoutId, lineItemsToUpdate)
	}

	const handleRemove = (itemId) => {
		removeItem(itemId)
	}

	useEffect(() => {
		let updateQuantity = {}
		cartItems.forEach(item => {
			updateQuantity[item.id] = item.quantity
		})
		setQuantity(updateQuantity)
		console.log('useEffect')
	}, [cartItems])

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
					{cartItems.map(item => {
						console.log(quantity)
						return (
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
									{ quantity &&
									<td>
										<select
											value={quantity[item.id]}
											name="quantity"
											onChange={(e) => handleUpdate(item.id, e.target.value)}>
											<option value={1}>one</option>
											<option value={2}>two</option>
											<option value={3}>three</option>
											<option value={4}>four</option>
											<option value={5}>five</option>
										</select>
									</td>
									}
								</tr>
							</tbody>
						)
					})}
				</table>
			}
			<p>Subtotal: {totals.total}</p>
			<button onClick={() => handleCheckout()}>Checkout</button>
		</Layout>
	)
}

export default Checkout;
