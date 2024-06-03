import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
const CouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>
       
      
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (code) => <b> $ {code}</b>,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"large"}>
          <Button
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
            type="primary"
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kupon silinsin mi?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategory = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri getirme hatası:", error);
    }
  });

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Silme işlemi başarılı");
        fetchCategory();
      } else {
        message.error("Silme başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default CouponPage;
