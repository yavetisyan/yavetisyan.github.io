import React from "react";
import MenuBar from "../NavBar/MenuBar/MenuBar";
import Footer from "components/pages/Footer";
import {makeStyles} from "@mui/styles";
import {Outlet} from "react-router";

const useStyle = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  section: {},
});

function Main() {

  return (
    <div>

      <MenuBar/>
      <Outlet/>
      <Footer/>

    </div>
  );
}

export default Main;
