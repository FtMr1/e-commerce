import React, {  useState } from "react";
import { Form, Button, Input, Spin, message } from "antd";

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
 const [form] = Form.useForm()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori  başarıyla oluşturuldu.");
        form.resetFields()
      } else {
        message.error("Kategori oluştururken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
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
          label="Kategori ismi"
          name="name"
          rules={[{ required: true, message: "Kategori adınız girin..!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori görseli"
          name="img"
          rules={[
            { required: true, message: "Kotegöri görsel linki girin...!" },
          ]}
        >
          <Input />
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

export default CreateCategoryPage;
