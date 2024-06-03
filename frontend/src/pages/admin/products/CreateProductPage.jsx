import React, { useEffect, useState } from "react";
import { Form, Button, Input, Spin, message, InputNumber, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Kotegori getirme başarısız.");
        }
      } catch (error) {
        console.log("Server hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    const imgLinks = values.img
      .split("\n")
      .filter((link) => link.trim() !== "");
    const colors = values.img.split("\n").filter((link) => link.trim() !== "");
    const sizes = values.img.split("\n").filter((link) => link.trim() !== "");
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
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
        message.success("Kategori  başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kategori oluştururken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası:", error);
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
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
