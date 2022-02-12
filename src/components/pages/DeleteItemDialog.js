import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import React, { useCallback, useContext } from "react";
import db from "../../firebase";

import { makeStyles } from "@mui/styles";
import ProductsContext from "context/ProductsContext";

const useStyle = makeStyles({
  dialogAction: {
    display: "flex",
    justifyContent: "center",
  },
});

function DeleteItemDialog({ item, onClose }) {
  const classes = useStyle();
  const { setProducts } = useContext(ProductsContext);
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

  const onDeleteItems = async (id) => {
    const docRef = doc(db, "items", id);
    await deleteDoc(docRef);
    addProduct();
    onClose();
  };

  return (
    <Container maxWidth="xs">
      <Dialog open onClose={onClose}>
        <DialogTitle style={{ cursor: "pointer" }} id="draggable-dialog-title">
          Are You Sure ?
        </DialogTitle>

        <DialogActions className={classes.dialogAction}>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onDeleteItems(item.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DeleteItemDialog;
