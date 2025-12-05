import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import portfolioReducer from "./portfolioSlice"; 

const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    portfolio: portfolioReducer, 
  },
});

export default store;
