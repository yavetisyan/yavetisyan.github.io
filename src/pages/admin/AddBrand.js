import React, {useState} from "react";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {setDoc, doc} from "firebase/firestore";
import {db} from "../../firebase";

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
  const [brandName, setBrandName] = useState("");

  // add brand
  const onAddBrand = async () => {
    try {
      await setDoc(doc(db, "brands", brandName), {
        name: brandName.toUpperCase(),
        value: brandName.toUpperCase()
      });
      setBrandName('')
    } catch (e) {
      console.log('Add brand error - ', e)
    }

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
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
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
