import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kategori görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc[0]}
          alt="..."
          width={50}
          style={{ borderRadius: "50%", height: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <b>${text.current.toFixed(2)}</b>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <b>%{text.discount.toFixed(2)}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"large"}>
          <Button
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
            type="primary"
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategori silinsin mi?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);
        if (!categoriesResponse.ok || !productsResponse) {
          message.error("Veri getirme başarısız.");
        }

        const [categoriesData , productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json()
        ])

        const productsWithCategories = productsData.map((product)=>{
          const categoryId = product.category
          const category = categoriesData.find((item)=> item._id === categoryId)
          return {
            ...product,
            categoryName : category ? category.name : "",

          }
        })
        setDataSource(productsWithCategories)
      } catch (error) {
        console.log("Giriş hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Silme işlemi başarılı");
       
        setDataSource((prevProduct) => {return prevProduct.filter((product)=> product._id !== productId)})
      } else {
        message.error("Silme başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
