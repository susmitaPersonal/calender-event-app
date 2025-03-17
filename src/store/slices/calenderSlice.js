import { createSlice } from "@reduxjs/toolkit";
import eventData from "../../calenderData.json";

const initialState = {
  selectedDate: null,
  events: eventData,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
