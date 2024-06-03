import React from 'react'
import './CartComp.css'
import CartProgress from './CartProgress'
import CartTable from './CartTable'
import CartCoupon from './CartCoupon'
import CartTotal from './CartTotal'
const CartComp = () => {
  return (
    <section className="cart-page">
        <div className="container">
            <div className="cart-page-wrapper">
                <form className="cart-form">
                    <CartProgress/>
                    <div className="shop-table-wrapper">
                            <CartTable/>
                            <CartCoupon/>
                    </div>
                </form>
                <div className="cart-collaterals">
                        <CartTotal/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CartComp