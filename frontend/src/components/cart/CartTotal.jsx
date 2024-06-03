import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartProvider'
import {loadStripe} from "@stripe/stripe-js"
import { Spin,message } from 'antd'

const CartTotal = () => {
    const [loading, setLoading] = useState(false)

    const [cargoCheck, setCargoCheck] = useState(false)
    const {cartItems} = useContext(CartContext)
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null

    const cartItemTotals= cartItems.map((item)=>{
        const itemTotal = item.price * item.quantity;

        return itemTotal
    })

    const subTotals = cartItemTotals.reduce((a,b)=>{
        return a + b
    },  0)
   
        const cargoFree = 15;
        const cartTotals = cargoCheck ? (subTotals + cargoFree).toFixed(2):subTotals.toFixed(2);

        const handlePayment = async()=>{
            setLoading(true)
            if(!user){
                return message.info("Ödeme yapmak için giriş yapmalısınız..")
            }
            const body  = {
                products: cartItems,
                user : user,
                cargoFree: cargoCheck ?  cargoFree : 0
            }
                try {
                    const stripe = await loadStripe(
                    import.meta.env.VITE_API_STRIPE_PUBLIC_KEY
                    )
                    const res = await fetch(`${apiUrl}/api/payment` ,  {
                        method : "POST",
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify(body)
                    })
                    if(!res.ok){
                        return message.error("Ödeme işlemi başarısız oldu..")
                    }
                    const session = await res.json()
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    })
                    if(result.error){
                        throw new Error(result.error.message);
                    }
                } catch (error) {
                    console.log(error)
                }finally{
                    setLoading(false)
                };
        };
    
  return (
    <div className="cart-totals">
                        <h2>Cart totals
                        </h2>
                        <table>
                            <tbody>
                                <tr className="cart-subtotal">
                                    <th>Subtotal</th>
                                    <td>
                                        <span id="subtotal">${subTotals}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <label>
                                                    Fast Cargo: $15.00
                                                    <input checked={cargoCheck} onChange={()=>setCargoCheck(!cargoCheck)} type="checkbox" id="fast-cargo"/>
                                                </label>
                                            </li>
                                            <li>
                                                <a href="#">Change Address</a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>
                                        <strong id="cart-total">${cartTotals}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="checkout">

                            <Spin spinning={loading}>
                            <button className="btn btn-lg" onClick={handlePayment}>Proceed to checkout</button>

                            </Spin>
                        </div>
                    </div>
  )
}

export default CartTotal