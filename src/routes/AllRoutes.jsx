import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Favorite from "../pages/Favorite";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/products/details/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default AllRoutes;
