import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="main-layout">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
