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

export const raiseNotification = (message, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(eraseNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
