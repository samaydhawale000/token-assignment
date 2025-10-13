import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { CardHorizontal } from "../commonComponents/CardHorizontal";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items } = useSelector((state) => state.products);
  const baseURL = import.meta.env.VITE_SERVER_BASE_URL; 

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return null;

  return (
    <div>
      <div className="ProductDetails">
        <div>
          <h4
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={19} />
            Back
          </h4>
          <h2>{product.title}</h2>
          <img
            src={product.image}
            alt={product.title}
            width="80%"
            height={"300px"}
            style={{
              borderRadius: "10px",
              marginTop: "10px",
              objectFit: "contain",
            }}
          />
        </div>
        <div>
          <p style={{ marginTop: "10px" }}>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
        </div>
      </div>
      <hr />

      <h2>More Products</h2>
      <div className="productsWrapper" style={{ marginBottom: "40px" }}>
        {items?.slice(4, 8)?.map((ele) => {
          return (
            <CardHorizontal
              key={ele.id}
              data={ele}
              onClick={() => {
                navigate(`/products/details/${ele.id}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
