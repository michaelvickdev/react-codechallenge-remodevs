import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  addPlanet: {
    open: false,
  },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    resetModals: (state) => initialState,
    openModal: (state, action) => {
      state[action.payload].open = true;
    },
    closeModal: (state, action) => {
      state[action.payload].open = false;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = modalsSlice;

// Extract and export each action creator by name
export const { resetModals, openModal, closeModal } = actions;

// Create and export selectors
export const selectModals = (state) => state.modals;
export const selectModal = (key) => createSelector([selectModals], (modals) => modals[key]);

// Export the reducer, either as a default or named export
export default reducer;
