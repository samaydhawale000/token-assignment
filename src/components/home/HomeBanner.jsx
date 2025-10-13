import React from "react";
import "./home.css";
import banner from "../../assets/banner.png";
import Button from "../../commonComponents/Button";
import { useNavigate } from "react-router-dom";

export default function HomeBanner() {
     const navigate = useNavigate()

  return (
    <div className="homeBanner">
      <div>
        <h2>Welcome to BlueMart</h2>
        <p>
          Your one-stop destination for trendy fashion, premium electronics, and
          stylish accessories. Explore high-quality products at unbeatable
          prices — all in one place. Shop smart, shop with confidence.
        </p>
        <Button onClick={()=>navigate('/products')}>Shop Now</Button>
      </div>
      <img src={banner} alt="banner" />
    </div>
  );
}
