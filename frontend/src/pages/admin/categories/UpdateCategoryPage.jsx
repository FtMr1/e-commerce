import React, { useCallback, useState } from 'react'
import { Form , Button , Input , Spin , message } from 'antd'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react'
const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false)
  const [form]= Form.useForm()
  const params = useParams()
  const categoryId = params.id
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


const onFinish = async (values) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      message.success("Kategori  güncellendi.");
    } else {
      message.error("Kategori güncellenirken bir hata oluştu.");
    }
  } catch (error) {
    console.log("Kategori güncelleme hatası:", error);
  } finally {
    setLoading(false);
  }
};


    
    useEffect(() => {
      const fetchSingleCategory = async () => {
        setLoading(true);
  
        try {
          const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);
  
          if (!response.ok) {
            throw new Error("Verileri yükleme hatası");
          }
  
          const data = await response.json();
  
          if (data) {
            form.setFieldsValue({
              name: data.name,
              img: data.img,
            });
          }
        } catch (error) {
          console.log("Veri hatası:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSingleCategory();
    }, [apiUrl, categoryId, form]);
  
   
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
      label="Kategori ismi"
      name="name"
      rules={[{ required: true, message: 'Kategori adınız girin..!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Kategori görseli"
      name="img"
      rules={[{ required: true, message: 'Kotegöri görsel linki girin...!' }]}
    >
      <Input />
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

export default UpdateCategoryPage