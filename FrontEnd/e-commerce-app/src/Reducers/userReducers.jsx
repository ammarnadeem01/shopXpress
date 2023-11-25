import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

export const reducers = createReducer(initialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
});
