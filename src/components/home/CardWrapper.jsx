import React, { useEffect } from "react";
import "./home.css";
import { CardHorizontal } from "../../commonComponents/CardHorizontal";
import { fetchProducts } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../commonComponents/Button";

export default function CardWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="card-wrapper">
      <h2>TOP PRODUCTS</h2>
      <div>
        {items?.slice(0,4)?.map((ele) => {
          return <CardHorizontal key={ele.id} data={ele} onClick={()=>{navigate(`/products/details/${ele.id}`)}} />;
        })}
      </div><Button onClick={()=>navigate('/products')}>View All Products</Button>
      
    </div>

    <div className="card-wrapper">
      <h2>Electronics</h2>
      <div>
        {items?.slice(8,12)?.map((ele) => {
          return <CardHorizontal key={ele.id} data={ele} onClick={()=>{navigate(`/products/details/${ele.id}`)}} />;
        })}
      </div>
            <Button onClick={()=>navigate('/products')}>View All Products</Button>
    </div>
    </div>
  );
}
