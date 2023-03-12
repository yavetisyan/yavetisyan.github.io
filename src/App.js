//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/NavBar/MenuBar/SignIn/SignIn";
import SignUp from "./components/NavBar/MenuBar/SignUp/SignUp";
import ForBoys from "./components/pages/ForBoys";
import ForGirls from "./components/pages/ForGirls";
import ForAccessories from "./components/pages/ForAccessories";
import ContactUs from "./components/pages/ContactUs";
import Admin from "./components/pages/Admin";
import Cart from "./components/pages/Cart";
import NotfundPage from "./components/pages/NotfundPage";
import Products from "./components/pages/Product";
import {useSelector} from "react-redux";
import {selectUserId} from "./store/slices/userSlices";
import Main from "./components/Maket/Main";
import Home from "./components/Maket/Home";

function App() {
  const userId = useSelector(selectUserId);

  return (

    <Routes>
      <Route path='/' element={<Main/>}>
        <Route index path='home' element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/boys" element={<ForBoys/>}/>
        <Route path="/girls" element={<ForGirls/>}/>
        <Route path="/accessories" element={<ForAccessories/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        {/*{userId === "1Hxk22s9WCc0MSOmbOqI3lPYKzE2" && (*/}
        <Route path="/Admin" element={<Admin/>}/>
        {/*)}*/}
        {/*{userId && <Route path="/Cart" element={<Cart/>}/>}*/}
        <Route path="/Cart" element={<Cart/>}/>}
        <Route path="*" element={<NotfundPage/>}/>
        <Route path={`products/:itemName`} element={<Products/>}/>
      </Route>
    </Routes>

  );
}

export default App;
