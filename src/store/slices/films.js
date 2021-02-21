import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFilms = createAsyncThunk("films/fetchFilms", async (films) => {
  const response = await Promise.all(films.map((film) => axios.get(film).then((res) => res.data)));
  return response;
});

const initialState = {
  values: [],
  error: null,
  loading: "idle",
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    resetFilms: (state) => initialState,
  },
  extraReducers: {
    [fetchFilms.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchFilms.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.values = action.payload;
    },
    [fetchFilms.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = filmsSlice;

// Extract and export each action creator by name
export const { resetFilms } = actions;

// Create and export selectors
export const selectFilms = (state) => state.films;

// Export the reducer, either as a default or named export
export default reducer;
