import {configureStore} from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    user: userSlices,
  },
});
//
// export const rootReducer = combineReducers({
//   user: userSlices,
//   products: userProducts
//
// })
//
// const store = createStore(rootReducer)
//
// console.log(store.getState())