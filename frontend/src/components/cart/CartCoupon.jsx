import React, { useContext, useState } from 'react'
import {message} from 'antd'
import { CartContext } from '../../context/CartProvider'



const CartCoupon = () => {
const [couponCode, setCouponCode] = useState("")
const {cartItems , setCartItems}=useContext(CartContext)
const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async()=>{
    if(couponCode.trim() === 0 ) {
     return  message.warning("Kupon kodu boş olamaz")
    }
    try {
        const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`)

        if(!res.ok){
          return message.warning("Kupon kodu hatalı..")
        }

        const data = await res.json()
          const discountNum = data.discountPercent

          const uptadetCartItems = cartItems.map((item)=>{  
                  const  updatePrice = item.price * (1- discountNum / 100)
                  return {...item , price : updatePrice}
    });
     setCartItems(uptadetCartItems)
     message.success(`${couponCode} başarılı şekilde uygulandı.`)
      } catch (error) {
      console.log(error)
    }
    }
  return (
    <div className="actions-wrapper">
    <div className="coupon">
        <input onChange={(e)=>setCouponCode(e.target.value)} type="text" className="input-text" placeholder="Coupon code"/>
        <button  type='button' onClick={applyCoupon} className="btn">Apply Coupon</button>
    </div>
    <div className="update-cart">
        <button className="btn">Update Cart</button>
    </div>
</div>
  )
}

export default CartCoupon