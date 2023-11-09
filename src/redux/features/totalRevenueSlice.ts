import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  totalRevenue: 0
};

export const totalRevenue = createSlice({
  name: "totalRevenue",
  initialState,
  reducers: {
    updateTotalRevenue: (state, action: PayloadAction<number>) => {
      state.totalRevenue = action.payload;
    },
  },
});

export const {updateTotalRevenue} = totalRevenue.actions;
export default totalRevenue.reducer;
