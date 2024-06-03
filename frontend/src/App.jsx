import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Shop from "./pages/BlogPage";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ProductdePage from "./pages/ProductdePage";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/Shop";
import Auth from "./components/auth/Auth";
import UserPage from "./pages/admin/UserPage";
import CategoryPage from "./pages/admin/categories/CategoryPage";
import UpdateCategoryPage from "./pages/admin/categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/admin/categories/CreateCategoryPage";
import CreateProductPage from "./pages/admin/products/CreateProductPage";
import ProductPage from "./pages/admin/products/ProductPage";
import UpdateProductPage from "./pages/admin/products/UpdateProductPage";
import CouponPage from "./pages/admin/coupons/CouponPage";
import CreateCouponPage from "./pages/admin/coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/admin/coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/admin/OrderPage";
import DashboardPage from "./pages/admin/DashboardPage";

//import Shop from './pages/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/products/:id" element={<ProductdePage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
