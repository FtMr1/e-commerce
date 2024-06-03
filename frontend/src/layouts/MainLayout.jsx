import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Search from '../components/modals/search/Search'
import Dialog from '../components/modals/dialog/Dialog'
const MainLayout = ({children}) => {

  const [isSearch, setIsSearch] = useState(false)
  const [isModal, setIsModal] = useState(false);


  useEffect(() => {
      const dialogStatus = localStorage.getItem("dialog") ? JSON.parse(localStorage.getItem("dialog")): localStorage.setItem("dialog" , JSON.stringify(true))

      setTimeout(() => {
      setIsModal(dialogStatus)
  }, 3000);
  
   
  }, [])
  



  return (
    <div className='main-layout'>
      <Dialog isModal={isModal} setIsModal={setIsModal}/>
         <Search isSearchShow={isSearch} setIsSearch={setIsSearch} />
        <Header setIsSearch={setIsSearch}/>
        {children}
        <Footer/>
    </div>
  )
}

export default MainLayout



