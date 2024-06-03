import React, { useContext } from 'react'
import CartProvider, { CartContext } from '../../context/CartProvider'

const CartItem = ({cartItem}) => {

  const {removeCart}=useContext(CartContext)
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={()=>removeCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price}</td>
      <td className="product-quantity">{cartItem.quantity.toFixed(2)}</td>
      <td className="product-subtotal">
      ${(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  )
}

export default CartItem