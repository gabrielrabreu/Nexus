import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { add, update, fetchAll } from "./Skus.thunks";

interface State {
  loading: boolean;
  skus: ISku[];
  error: string | undefined;
}

const initialState: State = {
  loading: false,
  skus: [],
  error: undefined,
};

export const skusSlice = createSlice({
  name: "skus",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchAll.fulfilled, (state, action: PayloadAction<ISku[]>) => {
      state.loading = false;
      state.skus = action.payload;
    });
    builder.addCase(fetchAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(add.fulfilled, (state, action: PayloadAction<ISku>) => {
      state.skus.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(update.fulfilled, (state, action: PayloadAction<ISku>) => {
      const sku = state.skus.find(s => s.id === action.payload.id);
      if (sku) {
        sku.code = action.payload.code;
        sku.name = action.payload.name;
        sku.price = action.payload.price;
        sku.stock = action.payload.stock;
      }
    });
    builder.addCase(update.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export default skusSlice.reducer;
