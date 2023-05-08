import React from "react";
import {Button, Container, Dialog, DialogActions, DialogTitle,} from "@mui/material";
import {deleteDoc, doc} from "firebase/firestore";
import {deleteObject, ref} from "firebase/storage";

import {makeStyles} from "@mui/styles";
import {db, storage} from "../firebase";

const useStyle = makeStyles({
  dialogAction: {
    display: "flex",
    justifyContent: "center",
  },
});

function DeleteItemDialog({item, onClose, onOpen, name}) {
  const classes = useStyle();

  const onDeleteItems = async (id) => {
    const desertRef = ref(storage, `${item.categories}/ ${item.imageName}`);
    console.log(desertRef);
    await deleteDoc(doc(db, name, id));
    await deleteObject(desertRef);
    onClose();
  };

  return (
    <Container maxWidth="xs">
      <Dialog open={onOpen}
              onClose={onClose}>
        <DialogTitle style={{cursor: "pointer"}} id="draggable-dialog-title">
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
