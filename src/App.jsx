import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="main-layout">
      <Navbar />
      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
