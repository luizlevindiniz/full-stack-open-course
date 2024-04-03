import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      return message;
    },
    eraseNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, eraseNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
