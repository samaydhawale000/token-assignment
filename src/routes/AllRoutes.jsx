import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
