import { ProductSnippet } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { productSnippets: ProductSnippet[] | [] } = {
  productSnippets: [],
};

export const productSnippets = createSlice({
  name: "productSnippets",
  initialState,
  reducers: {
    updateProductSnippets: (state, action: PayloadAction<ProductSnippet[]>) => {
      state.productSnippets = action.payload;
    },
  },
});

export const {updateProductSnippets} = productSnippets.actions;
export default productSnippets.reducer;
