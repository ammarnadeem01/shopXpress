// import { createReducer } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/v3/products");
//     return response.data.product;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
// const initialState = {
//   data: [],
// };
// const customReducer = createReducer(initialState, {
//   ALL_PRODUCTS: (state, action) => {
//     state.data = action.payload;
//   },
//   SPECIFIC_PRODUCT: (state, action) => {
//     state.data = state.data.filter((element) => {
//       element.includes(action.payload);
//     });
//   },
// });
// export default customReducer;
