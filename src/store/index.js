import { configureStore } from "@reduxjs/toolkit";

import planetsReducer from "./slices/planets";
import filmsReducer from "./slices/films";
import residentsReducer from "./slices/residents";
import modalsReducer from "./slices/modals";

const store = configureStore({
  reducer: {
    planets: planetsReducer,
    films: filmsReducer,
    residents: residentsReducer,
    modals: modalsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
