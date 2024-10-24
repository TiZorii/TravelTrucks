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

// import { createSlice } from '@reduxjs/toolkit';
// import { getAdverts } from './operations';

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const initialState = {
//   adverts: [],
//   favorites:
//     JSON.parse(localStorage.getItem('persist:favorites'))?.favorites ?? [],
//   bookings: [],
//   isLoading: false,
//   error: null,
// };

// export const advertsSlice = createSlice({
//   name: 'adverts',
//   initialState,
//   reducers: {
//     addFavorite: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//     removeFavorite: (state, action) => {
//       state.favorites = state.favorites.filter(
//         advert => advert._id !== action.payload
//       );
//     },
//     bookCamper: (state, action) => {
//       state.bookings.push(action.payload);
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(getAdverts.pending, handlePending)
//       .addCase(getAdverts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;

//         const newAdverts = action.payload.filter(
//           newAdvert =>
//             !state.adverts.some(
//               existingAdvert => existingAdvert._id === newAdvert._id
//             )
//         );
//         state.adverts = [...state.adverts, ...newAdverts];
//       })
//       .addCase(getAdverts.rejected, handleRejected);
//   },
// });

// export const { addFavorite, removeFavorite, bookCamper } = advertsSlice.actions;

// export const advertsReducer = advertsSlice.reducer;