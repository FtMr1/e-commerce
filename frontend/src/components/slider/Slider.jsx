import React from 'react'
import './Slider.css'
import SliderItem from './SliderItem'
const Slider = () => {
  return (
    <div>
        <section className="slider">
    <div className="slider-elements">
            <SliderItem/>
     
      <div className="slider-buttons">
        <button onclick="plusSlide(-1)">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onclick="plusSlide(1)">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider-dots">
        <button className="slider-dot active" onclick="currentSlide(1)">
          <span></span>
        </button>
        <button className="slider-dot" onclick="currentSlide(2)">
          <span></span>
        </button>
        <button className="slider-dot" onclick="currentSlide(3)">
          <span></span>
        </button>
      </div>
    </div>
  </section>
    </div>
  )
}

export default Slider