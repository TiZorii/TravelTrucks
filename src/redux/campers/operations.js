import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const getCampers = createAsyncThunk(
  "campers/getCampers",
  async (filters, { rejectWithValue }) => {
    try {
      const filteredParams = {};
      for (const key in filters) {
        if (filters[key] !== false) {
          filteredParams[key] = filters[key];
        }
      }

      console.log("Filtered Params:", filteredParams);
      const { data } = await axios.get(API_BASE_URL, {
        params: filteredParams,
      });
      console.log("API Response:", data);
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCamperDetails = createAsyncThunk(
  "campers/getCamperDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
