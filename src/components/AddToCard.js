import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  df: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: "20px",
  },
  img: {
    width: "400px",
  },
  items: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  itemName: {
    fontSize: "20px",
  },
  price: {
    fontSize: 35,
  },
  btn: {
    fontSize: "20px",
  },
  dialogBox: {
    borderRadius: "15px",
    padding: "0 30px ",
  },
});

function AddToCard({ item, onClose }) {
  const classes = useStyle();
  const navigate = useNavigate();

  const goToCart = (item) => {
    navigate("/cart");
    onClose();
  };

  return (
    <Dialog open onClose={onClose} className={classes.dialogBox}>
      <DialogContent>
        <Typography gutterBottom>
          <img src={item.ProductImage} alt="Img" className={classes.img} />
        </Typography>
      </DialogContent>
      <Box component="div">
        <DialogContent className={classes.items}>
          <Typography gutterBottom className={classes.itemName}>
            {item.itemName}
          </Typography>
          <Typography gutterBottom className={classes.price}>
            {item.price} AMD
          </Typography>
        </DialogContent>
      </Box>
      <div className={classes.df}>
        <Button autoFocus onClick={onClose} className={classes.btn}>
          Go to Buy
        </Button>
        <Button onClick={() => goToCart(item)} className={classes.btn}>
          Go to Card
        </Button>
      </div>
    </Dialog>
  );
}

export default AddToCard;
