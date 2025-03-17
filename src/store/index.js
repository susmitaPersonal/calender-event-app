import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calenderSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
