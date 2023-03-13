import React, {useState} from "react";
import {Alert, AlertTitle, Button, Dialog, DialogActions,} from "@mui/material";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {useNavigate} from "react-router-dom";

const CartPayment = ({open, onclose, emptyCart}) => {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClickToBuy = (e, newState) => {
    e.preventDefault();
    if (name && number && expiry && cvc) {
      setConfirm(true);
      setState({opened: true, vertical: "top", horizontal: "center"});

      setTimeout(() => {
        emptyCart();
        navigate("/home");
      }, 1000);
    }
  };

  const handleClose = () => {
    setState({...state, opened: false});
  };

  return (
    <Dialog
      open={open}
      onClose={onclose}
      aria-labelledby="responsive-dialog-title"
    >
      <div id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          name={name}
          number={number}
          focused={focus}
        />
        <form action="src/pages">
          <input
            type="number"
            name="number"
            value={number}
            placeholder="Card Number"
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />

          <input
            type="tel"
            name="cvc"
            value={cvc}
            placeholder="CVC"
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />
          <input
            type="text"
            name="expiry"
            value={expiry}
            placeholder="MM/YY Expiry"
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            required
          />

          <DialogActions>
            <Button autoFocus onClick={onclose} variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClickToBuy}
              autoFocus
              variant="contained"
              color="success"
            >
              BUY
            </Button>
          </DialogActions>
        </form>
      </div>
      {confirm && (
        <>
          <Alert severity="success" onClose={handleClose}>
            <AlertTitle>Success</AlertTitle>
          </Alert>
        </>
      )}
    </Dialog>
  );
};

export default CartPayment;
