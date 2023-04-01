//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser, setUser} from "./store/slices/userSlices";
import Home from "./pages/Home";
import Main from "./pages/Main";
import ContactUs from "./pages/ContactUs";
import Cart from "./components/Cart";
import NotfundPage from "./components/NotfundPage";
import {ProductionQuantityLimitsSharp} from "@mui/icons-material";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForBoys from "./pages/categires/ForBoys";
import ForAccessories from "./pages/categires/ForAccessories";
import ForGirls from "./pages/categires/ForGirls";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";
import AddBrand from "./pages/admin/AddBrand";
import AddItems from "./pages/admin/AddItems";
import AllItems from "./pages/admin/AllItems";


function App() {
  const dispatch = useDispatch()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      dispatch(setUser({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        token: user.accessToken,
      }))
      // console.log(user)
    } else {
      // User is signed out
      // ...
      dispatch(removeUser())
    }
  });

  return (
    <Routes>
      <Route path='/' element={<Main/>}>
        <Route index element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/boys" element={<ForBoys/>}/>
        <Route path="/girls" element={<ForGirls/>}/>
        <Route path="/accessories" element={<ForAccessories/>}/>`
        <Route path="/contactus" element={<ContactUs/>}/>
        {/*{userId === "1Hxk22s9WCc0MSOmbOqI3lPYKzE2" && (*/}
        <Route path="/admin" element={<Admin/>}>
          <Route index element={<Users/>}/>
          <Route path='/admin//add-brands' element={<AddBrand/>}/>
          <Route path='/admin/add-items' element={<AddItems/>}/>
          <Route path='/admin/all-items' element={<AllItems/>}/>
        </Route>
        {/*)}*/}
        {/*{userId && <Route path="/Cart" element={<Cart/>}/>}*/}
        <Route path="/cart" element={<Cart/>}/>
        {/*<Route index path="/users" element={<Users/>}/>}*/}
        <Route path="*" element={<NotfundPage/>}/>
        <Route path={`products/:itemName`} element={<ProductionQuantityLimitsSharp/>}/>
      </Route>
    </Routes>

  );
}

export default App;