import React, { useCallback, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Maket/Home";
import SignIn from "./MenuBar/SignIn/SignIn";
import SignUp from "./MenuBar/SignUp/SignUp";
import Cart from "../pages/Cart";
import Products from "../pages/Product";
import Admin from "components/pages/Admin";
import NotfundPage from "components/pages/NotfundPage";
import ProductsContext from "context/ProductsContext";
import ForBoys from "../pages/ForBoys";
import ForGirls from "../pages/ForGirls";
import ForAccessories from "../pages/ForAccessories";
import { selectUserId } from "store/slices/userSlices";
import { useSelector } from "react-redux";
import ContactUs from "components/pages/ContactUs";
import { collection, getDocs } from "@firebase/firestore";
import { storage } from "firebase";
import db from "../../firebase";

function Navbar() {
  const { setProducts, setSliderUrl } = useContext(ProductsContext);
  const userId = useSelector(selectUserId);

  const addProduct = useCallback(async () => {
    try {
      const products = await getDocs(collection(db, "items"));
      const productArray = [];
      products.forEach((doc) => {
        const obj = {
          ...doc.data(),
          id: doc.id,
          cart: false,
          ref: doc.ref,
        };
        productArray.push(obj);
      });
      setProducts(productArray);
    } catch (error) {
      console.log(error);
    }
  }, [setProducts]);

  useEffect(() => {
    addProduct();
  }, [addProduct]);

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("slider").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };
    const loadImages = async () => {
      const urls = await fetchImages();
      setSliderUrl(urls);
    };
    loadImages();
  }, [setSliderUrl]);

  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/boys" element={<ForBoys />} />
        <Route path="/girls" element={<ForGirls />} />
        <Route path="/accessories" element={<ForAccessories />} />
        <Route path="/contactus" element={<ContactUs />} />
        {userId === "dJ2ymqhFJ2NfdKOzlagIYet1EF32" && (
          <Route path="/Admin" element={<Admin />} />
        )}
        {userId && <Route path="/Cart" element={<Cart />} />}
        <Route path="*" element={<NotfundPage />} />
        <Route path={`products/:itemName`} element={<Products />} />
      </Routes>
    </div>
  );
}

export default Navbar;
