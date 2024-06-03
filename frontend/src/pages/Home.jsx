import React from 'react'
import Pulicy from '../components/pulicy/Pulicy'

import Slider from '../components/slider/Slider'
import Category from '../components/category/Category'
import Product from '../components/product/Product'
import Campany from '../components/campany/Campany'
import Blogs from '../components/blog/Blogs'
import Brands from '../components/brands/Brands'
import CampanySingle from '../components/CampanySingle/CampanySingle'




const Home = () => {
  return (
    <React.Fragment>
   
    <Slider/>
    <Category/>
    <Product/>
    <Campany/>
    
    <Blogs/>
    <Brands/>
    <CampanySingle/>
    <Pulicy/>
   
    </React.Fragment>
  )
}

export default Home