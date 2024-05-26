import { configureStore } from "@reduxjs/toolkit";
import { reducers as userReducer } from "./Reducers/userReducers";
import { reducers as cartReducer } from "./Reducers/cartReducers";
import { reducers as shippingReducer } from "./Reducers/shippingInfoReducers";
const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
    shippingReducer: shippingReducer,
  },
});
export default store;
