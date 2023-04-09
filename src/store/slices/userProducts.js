import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  brandName: '',
  categories: '',
  description: '',
  image: '',
  imageName: '',
  name: '',
  price: null
}

const itemProducts = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.brandName = action.payload.brandName;
      state.categories = action.payload.categories;
      state.description = action.payload.description;
      state.image = action.payload.image;
      state.imageName = action.payload.imageName;
      state.name = action.payload.name;
      state.price = action.payload.price;
    },
    removeProduct(state) {
      state.brandName = '';
      state.categories = '';
      state.description = '';
      state.image = '';
      state.imageName = '';
      state.price = null;
    }
  }
})

export const {setProduct, removeProduct} = itemProducts.actions

export default itemProducts.reducer