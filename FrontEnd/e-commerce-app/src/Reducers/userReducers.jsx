import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
  userAddress:"",
  userPhone:""
};

export const reducers = createReducer(initialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
  SET_USER_NAME: (state, action) => {
    state.userName = action.payload;
  },
  SET_USER_ADDRESS: (state, action) => {
    state.userName = action.payload;
  },
  SET_USER_PHONE: (state, action) => {
    state.userName = action.payload;
  },
});
