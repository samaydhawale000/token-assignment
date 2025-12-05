import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("portfolio")) || {};

const initialState = {
  tokens: savedData.tokens || [],
  totalValue: savedData.totalValue || 0,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addTokens: (state, action) => {
      action.payload.forEach((token) => {
        if (!state.tokens.find((t) => t.id === token.id)) {
          state.tokens.push({
            ...token,
            holdings: 0,
            value: 0,
            price: token.current_price || 0,
          });
        }
      });
      state.totalValue = state.tokens.reduce((sum, t) => sum + t.value, 0);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },

    
    removeToken: (state, action) => {
      state.tokens = state.tokens.filter((t) => t.id !== action.payload);
      state.totalValue = state.tokens.reduce((sum, t) => sum + t.value, 0);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },


    updateHoldings: (state, action) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        token.holdings = action.payload.holdings;
        token.value = token.holdings * token.price;
      }
      state.totalValue = state.tokens.reduce((sum, t) => sum + t.value, 0);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },

    
    updatePrices: (state, action) => {
     
      action.payload.forEach((p) => {
        const token = state.tokens.find((t) => t.id === p.id);
        if (token) {
          token.price = p.price;
          token.value = token.holdings * token.price;
        }
      });
      state.totalValue = state.tokens.reduce((sum, t) => sum + t.value, 0);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },
  },
});

export const { addTokens, removeToken, updateHoldings, updatePrices } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
