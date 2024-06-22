import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: ""
};

export const reducers = createReducer(initialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
  SET_USER_NAME: (state, action) => {
    state.userName = action.payload;
  },
});
