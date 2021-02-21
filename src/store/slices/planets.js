import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlanets = createAsyncThunk("planets/fetchPlanets", async () => {
  const response = await axios.get("https://swapi.dev/api/planets");
  return response.data.results;
});

const initialState = {
  values: [],
  error: null,
  loading: "idle",
};

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlanets.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchPlanets.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.values = action.payload;
    },
    [fetchPlanets.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = planetsSlice;

// Extract and export each action creator by name
export const {} = actions;

// Create and export selectors
export const selectPlanets = (state) => state.planets;
export const selectPlanetValue = (id) => createSelector([selectPlanets], (planets) => planets.values[id - 1]);

// Export the reducer, either as a default or named export
export default reducer;
