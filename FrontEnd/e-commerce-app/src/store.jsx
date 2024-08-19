import { configureStore } from "@reduxjs/toolkit";
import { reducers as userReducer } from "./Reducers/userReducers";
import { reducers as cartReducer } from "./Reducers/cartReducers";
import { reducers as shippingReducer } from "./Reducers/shippingInfoReducers";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.jsx";
const preloadedState = loadFromLocalStorage();
const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
    shippingReducer: shippingReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
export default store;
