import { createSlice } from "@reduxjs/toolkit";
import { getCampers, getCamperDetails } from "./operations";

const initialState = {
  campers: [],
  camperDetails: null,
  filters: {},
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  status: "idle",
  camperDetailsStatus: "idle",
  noResults: false,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampers.pending, (state) => {
        state.status = "loading";
        state.campers = [];
        state.noResults = false;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload;

        if (action.payload.length === 0) {
          state.noResults = true;
        }
      })
      .addCase(getCampers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCamperDetails.pending, (state) => {
        state.camperDetailsStatus = "loading";
      })
      .addCase(getCamperDetails.fulfilled, (state, action) => {
        state.camperDetailsStatus = "succeeded";
        state.camperDetails = action.payload;
      })
      .addCase(getCamperDetails.rejected, (state) => {
        state.camperDetailsStatus = "failed";
        state.camperDetails = null;
      });
  },
});

export const { setFilters, toggleFavorite } = campersSlice.actions;
export default campersSlice.reducer;
