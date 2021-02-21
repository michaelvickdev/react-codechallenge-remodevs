import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchResidents = createAsyncThunk("residents/fetchResidents", async (residents) => {
  const response = await Promise.all(residents.map((film) => axios.get(film).then((res) => res.data)));
  return response;
});

const initialState = {
  values: [],
  error: null,
  loading: "idle",
};

const ResidentsSlice = createSlice({
  name: "residents",
  initialState,
  reducers: {
    resetResidents: (state) => initialState,
  },
  extraReducers: {
    [fetchResidents.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchResidents.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.values = action.payload;
    },
    [fetchResidents.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = ResidentsSlice;

// Extract and export each action creator by name
export const { resetResidents } = actions;

// Create and export selectors
export const selectResidents = (state) => state.residents;

// Export the reducer, either as a default or named export
export default reducer;
