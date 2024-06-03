import React from 'react'
import './Brands.css'
import BrandItem from './BrandItem'
const Brands = () => {
  return (
    <section className="brands">
    <div className="container">
      <ul className="brand-list">
            <BrandItem/>
            <BrandItem/>
            <BrandItem/>
      
      </ul>
    </div>
  </section>
  )
}

export default Brands