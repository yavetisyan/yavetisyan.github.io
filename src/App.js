//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "./store/slices/userSlices";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Main from "./pages/Main";
import ForBoys from "./pages/ForBoys";
import ForGirls from "./pages/ForGirls";
import ForAccessories from "./pages/ForAccessories";
import ContactUs from "./pages/ContactUs";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import NotfundPage from "./components/NotfundPage";
import {ProductionQuantityLimitsSharp} from "@mui/icons-material";

function App() {
  const userId = useSelector(selectUserId);

  return (

    <Routes>
      <Route path='/' element={<Main/>}>
        <Route index path="/home" element={<Home/>}/>
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
        <Route path={`products/:itemName`} element={<ProductionQuantityLimitsSharp/>}/>
      </Route>
    </Routes>

  );
}

export default App;
