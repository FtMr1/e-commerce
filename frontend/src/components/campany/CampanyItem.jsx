import React from 'react'
import './CampanyItem.css'

const CampanyItem = () => {
  return (
    <div className="campaign-item">
    <h3 className="campaign-title">Fashion Month 
      Ready in Capital 
      Shop</h3>
    <p className="campaign-desc">Lorem ipsum dolor sit amet consectetur adipiscing elit dolor</p>
    <a href="#" className="btn btn-primary">
      View All
      <i className="bi bi-arrow-right"></i>
    </a>
  </div>
  )
}

export default CampanyItem