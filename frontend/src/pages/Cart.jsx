import React, { useContext } from "react";
import CartComp from "../components/cart/CartComp";
import { CartContext } from "../context/CartProvider";

const Cart = () => {
  const {cartItems} = useContext(CartContext)
  return (
    <>
    {cartItems.length > 0 ?   <CartComp />  : <h2 style={{textAlign:"center"}}>Sepette Ürün Yok!</h2>}

    
      
    </>
  );
};

export default Cart;
