import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  grossTotal: 0,
};
export const reducers = createReducer(initialState, {
  ADD_ITEM_TO_CART: (state, action) => {
    state.cartItems.push(action.payload);
  },
  UPDATE_ITEM_IN_CART: (state, action) => {
    state.cartItems.map((cartItem) => {
      cartItem.productId === action.payload.productId
        ? (cartItem.quantity = action.payload.quantity)
        : (cartItem.quantity = cartItem.quantity);
    });

    state.cartItems = [
      ...new Map(state.cartItems.map((obj) => [obj.productId, obj])).values(),
    ];
  },

  DELETE_ITEM_FROM_CART: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (cartItem) => cartItem.productId !== action.payload.id
    );
  },

  SET_TOTAL: (state, action) => {
    state.grossTotal = action.payload;
  },
  CART_RESTORE: () => {
    return initialState;
  },
});
