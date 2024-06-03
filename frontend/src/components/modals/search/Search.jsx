import React, { useState } from "react";
import "./Search.css";
import {message} from "antd"
import { Link } from "react-router-dom";



const Search = ({isSearchShow , setIsSearch}) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState(null)

  const handleClose = ()=>{
    setIsSearch(false)
    setSearchResults(null)
  
  }
   const handleSearch = async (e) =>{
    const productName = e.target[0].value
    e.preventDefault()

      if(productName.trim().length === 0){
        message.warning("Karakter hatası")
          return
      }
   
      try {
          const res = await fetch(`${apiUrl}/api/products/search/${productName.trim()}`)
          if(!res.ok){
            message.error("Ürün Getirme Hatası")
            return
          }
          const data = await res.json();
          setSearchResults(data)
      } catch (error) {
        console.log(error)
      }
   }  
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div className="results" style={{display : `${searchResults?.length === 0  ? "flex" : "grid" } `}}>
            {searchResults?.length === 0 && (
              <a href="#" className="result-item" style={{justifyContent: "center", width: "100%"}}>Aradığınız Ürün Bulunamadı</a>
            )}
           {setSearchResults?.length> 0 && searchResults?.map((item)=>(
                  <Link to={`products/${item._id}`} key={item._id} href="#" className="result-item">
                    
                  <img
                    src={item.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{item.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">${item.price.current.toFixed(2)}</span>
                  </div>
                </Link>
           ))}
           
          
           
          </div>
        </div>
        <i onClick={handleClose} className="bi bi-x-circle" id="close-search"></i>
      </div>
      <div className="modal-overlay" onClick={handleClose}>

      </div>
    </div>
  );
};

export default Search;
