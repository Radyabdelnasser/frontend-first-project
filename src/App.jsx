import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/layout";
import Home from "./components/home/home";
import NotFound from "./components/notFound/notFound";
import About from "./components/about/about";
import Products from "./components/products/products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/cart/cart";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Category from "./components/category/category";
import CategoryProducts from "./components/categoryProducts/categoryProducts";
import Profile from "./components/profile/profile";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/authContext/authContext";

export default function App() {
  return (
    <>
      <AuthContextProvider>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:categoryName" element={<CategoryProducts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthContextProvider>


      <Toaster />
    </>
  );
}
