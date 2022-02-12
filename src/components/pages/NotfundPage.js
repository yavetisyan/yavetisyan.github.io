import { makeStyles } from "@mui/styles";
import React from "react";
const useStyle = makeStyles({
  box: {
    color: "#1976D2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: "100vh",
  },
  titleName: {
    color: "rgb(161, 137, 121, 0.5)",
    fontSize: "50px",
  },
  h1: {
    fontSize: " 110px",
    margin: "4px",
    display: " inline-block",
  },
});

function NotfundPage() {
  const classes = useStyle();
  return (
    <div className={classes.box}>
      <h1 className={classes.h1}>4</h1> <h1 className={classes.h1}>0</h1>{" "}
      <h1 className={classes.h1}>4</h1> <h2> page not found</h2> <h3 style={{fontSize:50}}> 😭</h3>
    </div>
  );
}

export default NotfundPage;
