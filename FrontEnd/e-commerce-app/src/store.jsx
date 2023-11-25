import { configureStore } from "@reduxjs/toolkit";
import { reducers as userReducer } from "./Reducers/userReducers";
import { reducers as cartReducer } from "./Reducers/cartReducers";
const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
  },
});
export default store;
