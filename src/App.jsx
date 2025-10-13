import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="page-layout">
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
