import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/components/Auth/Auth.reducers";
import skusReducer from "@/components/Skus/Skus.reducers";

export const store = configureStore({
  reducer: {
    authReducer,
    skusReducer
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
