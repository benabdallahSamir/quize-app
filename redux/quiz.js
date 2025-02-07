import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  length: 0,
  quizzes: [],
};
/**
  {
  id: 0,
  quizzes: [],
  }
 */
const quizSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    setQuizData(state, { payload }) {
      const current = [...state.quizzes, payload];
      state.quizzes = current;
      state.length++;
    },
  },
});

export const { setQuizData } = quizSlice.actions;

export default quizSlice.reducer;
