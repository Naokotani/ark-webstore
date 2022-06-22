import React, { useState, useEffect } from "react";
import {
	useCartItems,
	useCheckout,
	useCartTotals,
  useRemoveItemFromCart,
}
	from "../context/StoreContext";
import Layout from "../components/Layout";

const Checkout = () => {

	const checkout = useCheckout();
	const cartItems = useCartItems();
	const totals = useCartTotals();
  const removeItem = useRemoveItemFromCart();

	console.log(totals)
	console.log(cartItems)

	const handleCheckout = () => {
		checkout();
	}

	const handleRemove = (id) => {
		removeItem(id);
		
	}

	return (
		<Layout>
			{!cartItems &&
				<h1>Your Cart is Empty</h1>
			}
			{cartItems &&
				<table>
					<tr>
						<th>Item</th>
						<th>quantity</th>
						<th>price</th>

					</tr>
					<td>
						{cartItems.map(item => (
							<tr key={item.id}>
								{item.title}
							</tr>
						))
						}
					</td>
					<td>
						{cartItems.map(item => (
							<tr key={item.id}>
								{item.quantity}
							</tr>
						))
						}
					</td>
					<td>
						{cartItems.map(item => (
							<tr key={item.id}>
								{item.variant.priceV2.amount}
							</tr>
						))
						}
					</td>
					<td>
						{cartItems.map(item => (
							<tr key={item.id}>
								<button
									onClick={() => handleRemove(item.id)}>
									Remove</button>
							</tr>
						))
						}
					</td>
				</table>
			}
			<p>{totals.total}</p>
			<button onClick={() => handleCheckout()}>Checkout</button>
		</Layout>
	)
}

export default Checkout;
