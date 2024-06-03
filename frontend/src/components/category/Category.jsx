import React, { useEffect, useState } from "react";
import "./Category.css";
import CategoryItem from "./CategoryItem";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
  
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri getirme hatası:", error);
      }
    };
    fetchCategory()
  }, [apiUrl])
  
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
        
         {categories.map((cat , i)=>(
              <CategoryItem key={i} category={cat}/>
         ))}
        </ul>
      </div>
    </section>
  );
};

export default Category;
