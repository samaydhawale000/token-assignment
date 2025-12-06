import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const savedData = JSON.parse(localStorage.getItem("portfolio")) || {};

const initialState = {
  tokens: savedData.tokens || [],
  totalValue: savedData.totalValue || 0,
   lastUpdated: savedData.lastUpdated || null,
};

export const refreshPortfolioPrices = createAsyncThunk(
  "portfolio/refreshPrices",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { tokens } = getState().portfolio;
      if (!tokens.length) return [];

      const ids = tokens.map((t) => t.id).join(",");

      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: { vs_currency: "usd", ids },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    // ------------------ add ------------------
    addTokens: (state, action) => {
      action.payload.forEach((token) => {
        if (!state.tokens.find((t) => t.id === token.id)) {
          state.tokens.push({
            ...token,
            holdings: 0,
            price: token.current_price || 0,
            value: 0,
          });
        }
      });

      state.totalValue = state.tokens.reduce((s, t) => s + t.value, 0);
      localStorage.setItem("portfolio", JSON.stringify(state));
    },

    removeToken: (state, action) => {
      state.tokens = state.tokens.filter((t) => t.id !== action.payload);
      state.totalValue = state.tokens.reduce((s, t) => s + t.value, 0);

      localStorage.setItem("portfolio", JSON.stringify(state));
    },

    updateHoldings: (state, action) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);

      if (token) {
        token.holdings = Number(action.payload.holdings);
        token.value = token.holdings * token.price;
      }

      state.totalValue = state.tokens.reduce((s, t) => s + t.value, 0);
      const updatedState = {
        ...state,
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem("portfolio", JSON.stringify(updatedState));
      state.lastUpdated = updatedState.lastUpdated;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshPortfolioPrices.pending, (state) => {})
      .addCase(refreshPortfolioPrices.fulfilled, (state, action) => {
        action.payload.forEach((p) => {
          const token = state.tokens.find((t) => t.id === p.id);
          if (token) {
            token.price = p.current_price;
            token.value = token.holdings * token.price;
          }
        });
        toast.success("Prices Refreshed successfully!");
        state.totalValue = state.tokens.reduce((sum, t) => sum + t.value, 0);

        localStorage.setItem("portfolio", JSON.stringify(state));
      })
      .addCase(refreshPortfolioPrices.rejected, (state) => {
        toast.error("Failed to update prices.");
      });
  },
});

export const { addTokens, removeToken, updateHoldings } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
