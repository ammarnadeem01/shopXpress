import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  grossTotal : 0
};
export const reducers = createReducer(initialState, {
  ADD_ITEM_TO_CART: (state, action) => {
    state.cartItems.push(action.payload);
  },
  UPDATE_ITEM_IN_CART: (state,action)=>{
    state.cartItems.map((cartItem)=>{
      cartItem.productId===action.payload.productId
      ?cartItem.quantity=action.payload.quantity
      :cartItem.quantity=cartItem.quantity
    })
    
    state.cartItems = [...new Map(state.cartItems.map(obj => [obj.productId, obj])).values()];

  },
  SET_TOTAL:(state,action)=>{
    state.grossTotal=action.payload;
  }
});
