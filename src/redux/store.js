// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
     favorites: favoritesReducer,
  },
});

export default store;
