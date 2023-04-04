import React from "react";
import {Button, Container, Dialog, DialogActions, DialogTitle,} from "@mui/material";
import {deleteDoc, doc} from "firebase/firestore";

import {makeStyles} from "@mui/styles";
import {db} from "../firebase";

const useStyle = makeStyles({
  dialogAction: {
    display: "flex",
    justifyContent: "center",
  },
});

function DeleteBrandItem({item, onClose, onOpen}) {
  const classes = useStyle();

  const onDeleteItems = async (id) => {
    await deleteDoc(doc(db, 'brands', id));
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

export default DeleteBrandItem;
