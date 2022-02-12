import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { auth, storage, Context } from "./firebase";
import db from "./firebase";
import AdminContext from "context/AdminContext";
import ProductsContext from "context/ProductsContext";
import CategoriesContext from "context/CategoriesContext";
import { store } from "store/indexStore";
import { Provider } from "react-redux";

function Products() {
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [googleProfileImg, setGoogleProfileImg] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescr] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [addItem, setAddItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [getCatName, setGetCatName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [prodItem, setProdItem] = useState();
  const [sliderUrl, setSliderUrl] = useState([]);

  return (
    <React.StrictMode>
      <Context.Provider
        value={{
          db,
          auth,
          storage,
        }}
      >
        <ProductsContext.Provider
          value={{
            products,
            setProducts,
            itemPrice,
            setItemPrice,
            itemDescription,
            setItemDescr,
            itemImage,
            setItemImage,
            addItem,
            setAddItem,
            cart,
            setCart,
            prodItem,
            setProdItem,
            sliderUrl,
            setSliderUrl,
          }}
        >
          <CategoriesContext.Provider value={{ getCatName, setGetCatName }}>
            <AdminContext.Provider
              value={{
                imageUrl,
                setImageUrl,
                googleProfileImg,
                setGoogleProfileImg,
                filteredItems,
                setFilteredItems,
              }}
            >
              <BrowserRouter>
                <Provider store={store}>
                  <App />
                </Provider>
              </BrowserRouter>
            </AdminContext.Provider>
          </CategoriesContext.Provider>
        </ProductsContext.Provider>
      </Context.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Products />, document.getElementById("root"));

reportWebVitals();
