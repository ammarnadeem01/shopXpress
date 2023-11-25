import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
export const reducers = createReducer(initialState, {
  ADD_ITEM_TO_CART: (state, action) => {
    state.cartItems.push(action.payload);
  },
});
