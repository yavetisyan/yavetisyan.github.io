import React from "react";
import MenuBar from "../NavBar/MenuBar/MenuBar";
import Navbar from "../NavBar/Menu";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserAuth } from "store/slices/userSlices";
import Footer from "components/pages/Footer";
import { makeStyles } from "@mui/styles";

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
  const classes = useStyle();
  const isAutheinticating = useSelector(selectUserAuth);
  return (
    <div>
      {isAutheinticating ? (
        <Box className={classes.box}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MenuBar />
          <Navbar />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Main;
