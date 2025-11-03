import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/layout";
import Home from "./components/home/home";
import NotFound from "./components/notFound/notFound";
import About from "./components/about/about";
import Products from "./components/products/products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/cart/cart";
import Category from "./components/category/category";
import CategoryProducts from "./components/categoryProducts/categoryProducts";
import Profile from "./components/profile/profile";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./components/authContext/authContext";
import AuthPage from "./components/authPage/authPage";
import Checkout from "./components/checkout/checkout";

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
            <Route path="authPage" element={<AuthPage />} />
            <Route path="category" element={<Category />} />
            <Route path="checkout" element={<Checkout />} />
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
