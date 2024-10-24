import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://657cadab853beeefdb99d1f6.mockapi.io/';

export const getAdverts = createAsyncThunk(
  'adverts/getAdverts',
  async ({ page, limit }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/adverts?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);