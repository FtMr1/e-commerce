import React, {  useState } from "react";
import { Form, Button, Input, Spin, message,InputNumber } from "antd";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
 const [form] = Form.useForm()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon  başarıyla oluşturuldu.");
        form.resetFields()
      } else {
        message.error("Kupon oluştururken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası:", error);
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
          label="Kupon Kodu"
          name="code"
          rules={[{ required: true, message: "Lütfen bir  kupon girin..!" }]}
        >
          <InputNumber/>
        </Form.Item>

        <Form.Item
          label="Kupon indirim  oranı"
          name="discountPercent"
          rules={[
            { required: true, message: "İndirim oranı girin...!" },
          ]}
        >
          <InputNumber />
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

export default CreateCouponPage;
