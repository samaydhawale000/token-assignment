import React from "react";
import { useSelector } from "react-redux";
import { CardHorizontal } from "../commonComponents/CardHorizontal";

export default function Favorite() {
  const favorites = useSelector((state) => state.favorites.items);
  return (
    <div className="productsWrapper" style={{margin:'50px 0px'}}>
      {favorites.length >0 ?favorites.map((ele) => (
        <CardHorizontal
          key={ele.id}
          data={ele}
          onClick={() => navigate(`/products/details/${ele.id}`)}
        />
      )) : <p>No Data Available!</p>}
    </div>
  );
}
