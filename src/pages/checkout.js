import React, { useState, useEffect } from "react";
import {
  useCartItems,
  useCheckout,
  useCartTotals,
  useRemoveItemFromCart,
  useUpdateItem,
}
  from "../context/StoreContext";
import Layout from "../components/Layout";

const Checkout = () => {

  const checkout = useCheckout();
  const cartItems = useCartItems();
  const totals = useCartTotals();
  const removeItem = useRemoveItemFromCart();
  const updateItem = useUpdateItem();

  const [quantity, setQuantity] = useState({});
  const [cartEmpty, setCartEmpty] = useState(true);

  const handleUpdate = (checkoutId, value) => {
    setQuantity({ ...quantity, [checkoutId]: value })
    const lineItemsToUpdate = [
      { id: checkoutId, quantity: parseInt(value) }
    ];
    updateItem(checkoutId, lineItemsToUpdate)
  }

  useEffect(() => {
    let updateQuantity = {}
    cartItems.forEach(item => {
      updateQuantity[item.id] = item.quantity
    })
    setQuantity(updateQuantity)
    cartItems[0] ? setCartEmpty(false) : setCartEmpty(true)
  }, [cartItems])

  return (
    <Layout>
      <h1 className="">Your Cart</h1>
      {!cartItems[0] ?
        <h3>Your Cart is Empty</h3>
        :
        <table>
          <thead>
            <tr>
              <th className="border">Item</th>
              <th className="border">quantity</th>
              <th className="border">price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              return (
                <tr>
                  <td className="border">{item.title}</td>
                  <td className="select">
                    <select
                      value={quantity[item.id]}
                      name="quantity"
                      onChange={(e) => handleUpdate(item.id, e.target.value)}>
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
                  </td>
                  <td className="number border">{item.variant.priceV2.amount}</td>
                  <td key={item.id}>
                    <button
                      onClick={() => removeItem(item.id)}>
                      Remove</button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td colSpan="3" className="border number">
                Subtotal: {totals.total}
              </td>
            </tr>
          </tbody>
        </table>
      }
      <button
        disabled={cartEmpty}
        onClick={() => checkout()}
        className="checkout-button">
        Checkout</button>
    </Layout>
  )
}

export default Checkout;
