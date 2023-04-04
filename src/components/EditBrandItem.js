import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "../firebase";


const EditBrandItem = ({item, onClose}) => {
  const listCategories = [
    {categories: "Boys"},
    {categories: "Girls"},
    {categories: "Accessories"},
  ];
  // const {setProducts} = useContext(ProductsContext);
  const [categories, setCategories] = useState(
    listCategories.find((c) => c.categories === item.categories)?.categories
  );

  const [brandName, setBrandname] = useState(item.name);
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


  const onEditItems = async (id) => {
    const docRef = doc(db, "brands", id);
    await updateDoc(docRef, {
      name: brandName,
    })
    onClose();
  };

  return (
    <Container maxWidth="xs">
      <Dialog
        open
        onClose={onClose}
      >
        <div
          style={{
            padding: '40px',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Brand Name"
            variant="filled"
            autoComplete="off"
            placeholder="Enter Name"
            value={brandName}
            onChange={(e) => setBrandname(e.target.value)}
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

export default EditBrandItem;
