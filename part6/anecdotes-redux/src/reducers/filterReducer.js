import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    selectedFilter(state, action) {
      const option = action.payload;
      return option;
    },
  },
});

export const { selectedFilter } = filterSlice.actions;
export default filterSlice.reducer;
