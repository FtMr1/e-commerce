import React, { useEffect, useState  } from "react";
import { Form, Button, Input, Spin, message, InputNumber, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams , useNavigate } from "react-router-dom";
const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const productId = params.id;


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);
        if (!categoriesResponse.ok || !singleProductResponse) {
          message.error("Veri getirme başarısız.");
        }

        const [categoriesData, singleProductsData] = await Promise.all([
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData);
       

        if(singleProductsData) {
          form.setFieldsValue({
            name: singleProductsData.name,
            current : singleProductsData.price.current,
            discount : singleProductsData.price.discount,
            description : singleProductsData.description,
            img : singleProductsData.img.join("\n"),
            colors : singleProductsData.colors.join("\n"),
            sizes : singleProductsData.sizes.join("\n"),
            category:singleProductsData.category
          });
        }
      } catch (error) {
        console.log("Giriş hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl, productId ,form]);

  const onFinish = async (values) => {
    const imgLinks = values.img
      .split("\n")
      .filter((link) => link.trim() !== "");
    const colors = values.colors.split("\n").filter((link) => link.trim() !== "");
    const sizes = values.sizes.split("\n").filter((link) => link.trim() !== "");
    
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors,
          sizes,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("Ürün  başarıyla oluşturuldu.");
        navigate("/admin/products")
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün güncelleştirme hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Ürün ismi"
          name="name"
          rules={[{ required: true, message: "Kategori adınız girin..!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Kategori"
          name="category"
          rules={[{ required: true, message: "Lütfen bir kategori seçin...!" }]}
        >
          <Select>
            {categories.map((cat) => (
              <Select.Option key={cat._id} values={cat._id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[{ required: true, message: "Ürün açıklaması girin..." }]}
        >
          <ReactQuill theme="snow" style={{ background: "white" }} />
        </Form.Item>
        <Form.Item
          label="fiyat"
          name="current"
          rules={[{ required: true, message: "Ürün fiyatını girin..." }]}
        >
          <InputNumber
            placeholder="Ürün fiyatını girin..."
            autosize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="İndirim"
          name="discount"
          rules={[{ required: true, message: "İndirim Tutarı Girin" }]}
        >
          <InputNumber placeholder="indirim Tutarı" autosize={{ minRows: 4 }} />
        </Form.Item>
        <Form.Item
          label="Ürün görselleri(Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4  görsel linki girin...!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Görsel linklerini yeni bir satıra yazın"
            autosize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün renkleri (RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4  görsel linki girin...!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="RGB kodlarını yeni bir satıra yazın"
            autosize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Bedenlerini Girin"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün bedeni  girin...!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her beden numarasını yeni bir satıra yazın"
            autosize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            GÜNCELLE
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
