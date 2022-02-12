import React, { useCallback, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Container, TextareaAutosize } from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import db from "../../firebase";
import ProductsContext from "context/ProductsContext";

const EditItemDialog = ({ item, onClose }) => {
  const listCategories = [
    { categories: "Boys" },
    { categories: "Girls" },
    { categories: "Accessories" },
  ];
  const { setProducts } = useContext(ProductsContext);
  const [categories, setCategories] = useState(
    listCategories.find((c) => c.categories === item.categories)?.categories
  );

  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [itemName, setItemName] = useState(item.itemName);
  const [openD, setOpenD] = useState(false);

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleOpenD = () => {
    setOpenD(true);
  };

  const onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

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

  const onEditItems = async (id) => {
    const docRef = doc(db, "items", id);

    const payload = {
      price,
      description,
      itemName,
      categories,
    };
    await updateDoc(docRef, payload);
    addProduct();
    onClose();
  };

  return (
    <Container maxWidth="xs">
      <Dialog
        open
        onClose={onClose}
        style={{
          borderRadius: 15,
        }}
      >
        <div
          style={{
            width: 600,
            height: 500,
            border: "1px solod #000",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Item Name"
            variant="filled"
            autoComplete="off"
            placeholder="Enter Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <FormControl sx={{ m: 1, minWidth: 215 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Enter Categories
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openD}
              onClose={handleCloseD}
              onOpen={handleOpenD}
              value={categories}
              label="Enter Categories"
              onChange={onChangeCategories}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listCategories.map((c) => (
                <MenuItem value={c.categories} key={c.categories}>
                  {c.categories}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            maxRows={1}
            aria-label="maximum height"
            placeholder="Enter Desctiption"
            defaultValue={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: 400,
              height: 200,
              overflowY: "scroll",
            }}
          />
        </div>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onEditItems(item.id)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditItemDialog;
