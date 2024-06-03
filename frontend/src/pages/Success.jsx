import { Button, Result } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
    const {setCartItems} = useContext(CartContext);

    useEffect(() => {
        setCartItems([])
    
     
    }, [setCartItems])
    
  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme başarı ile gerçekleşti!"
          subTitle="Siparişiniz tamamlandı."
          extra={[
            <Link to={"/"} type="primary" key="home">
              <Button type="primary">Ana Sayfa</Button>
            </Link>,
            <a href="/admin/orders" key={"order"}> 
                        <Button key="buy">Siparişlerim</Button>,

            </a>
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
