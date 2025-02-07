import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzeNumber: 0,
  categories: [],
};

const quizeParamsSlice = createSlice({
  name: "quizeParams",
  initialState,
  reducers: {
    setParams: (state, action) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
});

export const { setParams } = quizeParamsSlice.actions;

export default quizeParamsSlice.reducer;
