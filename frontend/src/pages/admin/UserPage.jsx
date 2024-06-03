import React, { useCallback, useEffect, useState } from 'react'
import {Table , Button , Popconfirm} from 'antd'
const UserPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [dataSource, setDataSource] = useState([])
   
const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render : (imgSrc)=>(
        <img src={imgSrc} alt="..." width={50} style={{borderRadius:"50%", height:"50%"}} />
    )
    },
{
title: 'UserName',
dataIndex: 'username',
key: 'username',
},
{
title: 'Email',
dataIndex: 'email',
key: 'email',
},
{
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    },

{
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (_ , record) =>(
    <Popconfirm
    title="Kullanıcıyı Sil"
    description="Kullanıcı silinsin mi?"
    okText="Yes"
    cancelText="No"
    onConfirm={()=>deleteUser(record.email)}
  >
    <Button  type='primary' danger>Delete</Button>
  
    </Popconfirm>
  )
  },
];



const fetchUser = useCallback(async () => {
   
    try {
      const response = await fetch(`${apiUrl}/api/users`)
       

      if (response.ok) {
        const data = await response.json();
            setDataSource(data)
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    }
  }) ;
   

    const deleteUser =  async (userEmail)=>{
      try {
        const response = await fetch(`${apiUrl}/api/users/${userEmail}`,{
          method:"DELETE"
        })
         
  
        if (response.ok) {
            message.success("Silme işlemi başarılı")
          fetchUser()
        } else {
          message.error("Silme başarısız.");
        }
      } catch (error) {
        console.log("Silme hatası:", error);
      }
    } 
    useEffect(() => {
      fetchUser()
    
      
    }, [apiUrl])

    return (
        <Table dataSource={dataSource} columns={columns} rowKey={(record)=>record._id} />
  )
}

export default UserPage