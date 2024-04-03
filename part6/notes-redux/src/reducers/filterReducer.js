import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterSelected(state, action) {
      const option = action.payload;
      return option;
    },
  },
});

export const { filterSelected } = filterSlice.actions;
export default filterSlice.reducer;
