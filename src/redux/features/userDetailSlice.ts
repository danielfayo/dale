import { fetchUserDetails } from "@/firebase/fetchUserDetails";
import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { data } = fetchUserDetails();

export const userDetails = createSlice({
  name: "userDetails",
  initialState : data,
  reducers: {}
});

export const {  } = userDetails.actions;
export default userDetails.reducer;