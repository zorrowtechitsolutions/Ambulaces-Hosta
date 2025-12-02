import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ambulanceApi } from "./service/ambulance";


export const store = configureStore({
  reducer: {
    [ambulanceApi.reducerPath]: ambulanceApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ambulanceApi.middleware),
});

setupListeners(store.dispatch);
