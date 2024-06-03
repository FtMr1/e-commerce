import React, { Fragment } from 'react'

import Category from '../components/category/Category'
import Product from '../components/product/Product'
import CampanySingle from '../components/CampanySingle/CampanySingle'
import Pulicy from '../components/pulicy/Pulicy'


const ShopPage = () => {
  return (
   <>
          
          <Category/>
          <Product/>
          <CampanySingle/>
        
          <Pulicy/>
          
   </>
  )
}

export default ShopPage