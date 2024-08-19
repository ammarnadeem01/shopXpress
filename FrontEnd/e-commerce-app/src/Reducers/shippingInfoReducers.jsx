import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  shippingData: {
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  },
};
export const reducers = createReducer(initialState, {
  SET_SHIPPING_DATA: (state, action) => {
    state.shippingData.address = action.payload.address;
    state.shippingData.city = action.payload.city;
    state.shippingData.state = action.payload.state;
    state.shippingData.country = action.payload.country;
    state.shippingData.phone = action.payload.phone;
  },
});
