import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
  value: []
};

const slice = createSlice({
  name: 'quizResponse',
  initialState,
  reducers: {
    changeQuizResult(state, value){
      state.value = state.value.filter(item => item.questionId !== value.payload.questionId && item.questionId !== 0);
      state.value = [...state.value, value.payload];
    }
  }
});

export default slice.reducer;
export const { changeQuizResult } = slice.actions;
export const { actions } = slice;
