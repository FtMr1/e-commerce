import React from "react";
import "./ProductsDetail.css";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import Galery from "./galery/Galery";
import Info from "./ınfo/Info";
import Tabs from "./tabs/Tabs";
const ProductDetails = ({setSingleProduct , singleProduct }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb />

          <div className="single-content">
            <main className="site-main">
              <Galery singleProduct={singleProduct} />
              <Info singleProduct={singleProduct} />
            </main>
          </div>

            <Tabs setSingleProduct={setSingleProduct} singleProduct={singleProduct} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
