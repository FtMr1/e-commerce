import React, { useCallback, useState } from 'react'
import { Form , Button , Input , Spin , message ,InputNumber } from 'antd'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react'
const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false)
  const [form]= Form.useForm()
  const params = useParams()
  const couponId = params.id
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


const onFinish = async (values) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      message.success("Kupon  güncellendi.");
    } else {
      message.error("Kupon güncellenirken bir hata oluştu.");
    }
  } catch (error) {
    console.log("Kupon güncelleme hatası:", error);
  } finally {
    setLoading(false);
  }
};


    
    useEffect(() => {
      const fetchSingleCoupon = async () => {
        setLoading(true);
  
        try {
          const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);
  
          if (!response.ok) {
            throw new Error("Verileri yükleme hatası");
          }
  
          const data = await response.json();
  
          if (data) {
            form.setFieldsValue({
              code: data.code,
              discountPercent: data.discountPercent,
            });
          }
        } catch (error) {
          console.log("Veri hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSingleCoupon();
    }, [apiUrl, couponId, form]);
  
   
  return (
    <Spin spinning={loading}>
            <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    layout='vertical'
    autoCapitalize='off'
    onFinish={onFinish}
    
    autoComplete="off"
  >
    <Form.Item
      label="Kupon Codu"
      name="code"
      rules={[{ required: true, message: 'Kupon  girin..!' }]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      label="İndirim Oranı"
      name="discountPercent"
      rules={[{ required: true, message: 'İndirim girin...!' }]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
     
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8  }}>
      <Button type="primary" htmlType="submit">
        Güncelle
      </Button>
    </Form.Item>
  </Form>
    </Spin>
  
  )
}

export default UpdateCouponPage