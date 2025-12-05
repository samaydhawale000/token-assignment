import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getTokens = createAsyncThunk(
  "tokens/getTokens",
  async ({ page }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page,
            sparkline: true,
          },
        }
      );

      return { data: res.data, page };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// API 2: SEARCH TOKENS
export const searchTokens = createAsyncThunk(
  "tokens/searchTokens",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/search", {
        params: { query },
      });

      const list = res.data.coins.map((c) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        img: c.thumb,
      }));

      return list;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tokenSlice = createSlice({
  name: "tokens",
  initialState: {
    list: [],
    searchList: [],
    page: 1,
    hasMore: true,
    loading: false,
    searching: false,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchList = [];
      state.searching = false;
    },
  },
  extraReducers: (builder) => {
     //    ----- this is for normal token list pagination -----------
    builder
      .addCase(getTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTokens.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page === 1) {
          state.list = action.payload.data;
        } else {
          state.list = [...state.list, ...action.payload.data];
        }

        state.hasMore = action.payload.data.length > 0;
        state.page = action.payload.page;
      })
      .addCase(getTokens.rejected, (state) => {
        state.loading = false;
      })

      //   Search -----------------
      .addCase(searchTokens.pending, (state) => {
        state.searching = true;
      })
      .addCase(searchTokens.fulfilled, (state, action) => {
        state.searching = false;
        state.searchList = action.payload;
      })
      .addCase(searchTokens.rejected, (state) => {
        state.searching = false;
      });
  },
});

export const { clearSearch } = tokenSlice.actions;
export default tokenSlice.reducer;
