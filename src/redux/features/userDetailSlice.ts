import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { userDetails: User } = {
  userDetails: {
    email: "",
    typeOfUser: "",
    uid: "",
    storeName: "",
    storeHeadline: "",
  },
};

export const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateAllUser: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
    },
  },
});

export const {updateAllUser} = userDetails.actions;
export default userDetails.reducer;
