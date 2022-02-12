import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  displayName: null,
  uid: null,
  token: null,
  isAutheinticating: true,
  cart: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload?.email;
      state.token = action.payload?.token;
      state.displayName = action.payload?.displayName;
      state.uid = action.payload?.uid;
      state.isAutheinticating = false;
    },
    setUserCart(state, action) {
      state.cart = action.payload;
    },

    removeUser(state) {
      state.email = null;
      state.uid = null;
      state.cart = null;
    },
  },
});

export const { setUser, removeUser, setUserCart } = userSlice.actions;
export const selectUser = (s) => s.user;
export const selectEmail = (e) => e.email;
export const selectUserAuth = (s) => s.user.isAutheinticating;
export const selectUserId = (s) => s.user.uid;
export const selectUserCart = (s) => s.user.cart;
export const selectUserCartUniqueItems = (s) =>
  s.user.cart?.items
    ?.filter((i, ind, arr) => arr.findIndex((item) => item.id === i.id) === ind)
    .map((i, ind, arr) => ({
      item: i,
      count: s.user.cart?.items?.filter((item) => item.id === i.id).length,
    }));

export default userSlice.reducer;
