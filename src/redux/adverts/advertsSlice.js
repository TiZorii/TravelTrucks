import { createSlice } from '@reduxjs/toolkit';
import { getAdverts } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  adverts: [],
  favorites:
    JSON.parse(localStorage.getItem('persist:favorites'))?.favorites ?? [],
  bookings: [],
  isLoading: false,
  error: null,
};

export const advertsSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        advert => advert._id !== action.payload
      );
    },
    bookCamper: (state, action) => {
      state.bookings.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAdverts.pending, handlePending)
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const newAdverts = action.payload.filter(
          newAdvert =>
            !state.adverts.some(
              existingAdvert => existingAdvert._id === newAdvert._id
            )
        );
        state.adverts = [...state.adverts, ...newAdverts];
      })
      .addCase(getAdverts.rejected, handleRejected);
  },
});

export const { addFavorite, removeFavorite, bookCamper } = advertsSlice.actions;

export const advertsReducer = advertsSlice.reducer;