import React from "react";
import Navbar from "./Navbar";
import Footer from "pages/Footer";
import {makeStyles} from "@mui/styles";
import {Outlet} from "react-router-dom";

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

      <div style={{display: 'flex', flexDirection: "column"}}>
        <div style={{marginBottom: "100px"}}><Navbar/></div>

        <div className='container'><Outlet/></div>
        <Footer/>
      </div>
    </div>
  );
}

export default Main;
