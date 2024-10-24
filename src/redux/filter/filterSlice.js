import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    location: '',
    details: {
      airConditioner: false,
      automatic: false,
      kitchen: false,
      TV: false,
      shower: false,
    },
    forms: '',
  },
  reducers: {
    filterUse(_, action) {
      return action.payload;
    },
  },
});

export const { filterUse } = filterSlice.actions;

export const filtersReducer = filterSlice.reducer;