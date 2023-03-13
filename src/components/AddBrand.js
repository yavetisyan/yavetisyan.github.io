import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import React, {useState} from "react";

const useStyle = makeStyles({
  brandBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    flexWrap: "wrap",
  },
});

function AddBrand() {
  const classes = useStyle();
  const [productName, setProductName] = useState("");

  // add brand
  const onAddBrand = async (id) => {
    // const brandRef = collection(db, "brands");
    // const payload = {
    //   name: productName,
    //   brandName: productName,
    // };
    //
    // payload.name ? await addDoc(brandRef, payload) : alert("Enter Value");
    //
    // setProductName("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {m: 1, width: "25ch"},
      }}
      noValidate
      autoComplete="off"
    >
      <div className={classes.brandBox}>
        <TextField
          required
          id="filled-required"
          label="Brand name"
          placeholder="Brand name"
          variant="filled"
          autoComplete="off"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button
          variant="contained"
          disableElevation
          onClick={onAddBrand}
          style={{marginLeft: 50}}
        >
          Add brand name
        </Button>
      </div>
    </Box>
  );
}

export default AddBrand;
