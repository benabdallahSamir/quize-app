import { configureStore } from "@reduxjs/toolkit";
import quiz from "./quiz";
import quizeParams from "./quizeParams";
const store = configureStore({
  reducer: {
    exams: quiz,
    quizeParams,
  },
});

export default store;
