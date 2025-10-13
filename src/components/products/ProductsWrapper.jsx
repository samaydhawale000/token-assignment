import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHorizontal } from "../../commonComponents/CardHorizontal";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { fetchProducts } from "../../redux/productSlice";
import SearchInput from "../../commonComponents/SearchInput";
import SelectBox from "../../commonComponents/SelectBox";

export default function ProductsWrapper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
    }, 1000); 
    return () => clearTimeout(timeout);
  }, [search]);

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelry" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
  ];

  const sortOptions = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];


  const filteredItems = useMemo(() => {
    let filtered = items || [];

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }


    if (debouncedSearch) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch)
      );
    }


    if (sort === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [items, category, debouncedSearch, sort]);

  return (
    <div>
      <div className="filterWrapper">
        <SearchInput
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SelectBox
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filter by category"
          className="mySelect"
          style={{ padding: "8px", borderRadius: "6px" }}
        />

        <SelectBox
          options={sortOptions}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          placeholder="Sort by price"
          className="mySelect"
          style={{ padding: "8px", borderRadius: "6px" }}
        />
        <p onClick={()=>{
          setCategory('')
          setSearch('')
          setSort('')
        }}>Reset</p>
      </div>

      <div className="productsWrapper">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products.</p>
        ) : filteredItems.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredItems.map((ele) => (
            <CardHorizontal
              key={ele.id}
              data={ele}
              onClick={() => navigate(`/products/details/${ele.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
