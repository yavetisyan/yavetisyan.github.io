import {combineReducers, createStore} from 'redux'
import userSlices from "./slices/userSlices";
import userProducts from "./slices/userProducts";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,`
//   },
// });

export const rootReducer = combineReducers({
  user: userSlices,
  products: userProducts

})

const store = createStore(rootReducer)

console.log(store.getState())