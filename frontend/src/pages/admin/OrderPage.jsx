import React, {  useEffect, useState } from "react";
import { Table,  message } from "antd";
const OrderPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
      
    
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <b>${(record /100).toFixed(2)}</b>,
    },

   
  ];

  

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.stripe.com/v1/payment_intents` , {
          method:"GET",
          headers:{
            Authorization : `Bearer ${MY_STRIPE_SECRET_KEY}`
          }
        }
        
        );
  
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri getirme hatası:", error);
      }
    };
    fetchData();

  }, [apiUrl]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default OrderPage;
