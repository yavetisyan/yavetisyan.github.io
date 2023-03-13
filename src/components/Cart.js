import React, {useMemo, useState} from "react";

import {db} from "../firebase";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectUserCartUniqueItems, selectUserId, setUserCart,} from "../store/slices/userSlices";
import {arrayRemove, collection, getDocs, query, updateDoc, where,} from "@firebase/firestore";
import CartPayment from "./CartPayment";

function Cart() {
  const userId = useSelector(selectUserId);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const items = useSelector(selectUserCartUniqueItems) || [];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const getCartItems = useCallback(async () => {
  //   if (items.length) {
  //     const cI = await Promise.all(items.map((i) => getDoc(i.item)));
  //     setCartItems(
  //       cI.map((i, ind) => ({
  //         item: {...i.data(), ref: i.ref},
  //         count: items[ind].count,
  //       }))
  //     );
  //   } else {
  //     setCartItems([]);
  //   }
  // }, [items, setCartItems]);

  // useEffect(() => {
  //   getCartItems();
  // }, [getCartItems]);

  const removeToCart = async (itemRef) => {
    const userRef = db.collection("users").doc(userId);
    const response = collection(db, "cart");
    const q = query(response, where("userRef", "==", userRef));
    const data = await getDocs(q);
    let ref = data.docs[0].ref;

    await updateDoc(ref, {items: arrayRemove(itemRef)});
    const newData = await getDocs(q);

    if (newData.docs[0]) {
      dispatch(
        setUserCart({
          ...newData.docs[0].data(),
          id: newData.docs[0].data(0).uid,
        })
      );
    }
  };

  const increase = async (itemRef) => {
    const userRef = db.collection("users").doc(userId);
    const response = collection(db, "cart");
    const q = query(response, where("userRef", "==", userRef));
    const data = await getDocs(q);
    const newItems = data.docs[0].data().items;
    let ref = data.docs[0].ref;

    newItems.push(itemRef);

    await updateDoc(ref, {items: newItems});

    const newData = await getDocs(q);

    if (newData.docs[0]) {
      dispatch(
        setUserCart({
          ...newData.docs[0].data(),
          id: newData.docs[0].data(0).uid,
        })
      );
    }
  };

  const decrease = async (itemRef) => {
    const userRef = db.collection("users").doc(userId);

    const response = collection(db, "cart");
    const q = query(response, where("userRef", "==", userRef));
    const data = await getDocs(q);

    let ref = data.docs[0].ref;
    const newItems = data.docs[0].data().items;

    newItems.splice(
      newItems.findIndex((item) => item.id === itemRef.id),
      1
    );
    await updateDoc(ref, {items: newItems});
    const newData = await getDocs(q);

    if (newData.docs[0]) {
      dispatch(
        setUserCart({
          ...newData.docs[0].data(),
          id: newData.docs[0].data(0).uid,
        })
      );
    }
  };
  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, {item, count}) => (acc += item.price * count),
        0
      ),
    [cartItems]
  );

  const getEmptyCart = async () => {
    const userRef = db.collection("users").doc(userId);
    const response = collection(db, "cart");
    const q = query(response, where("userRef", "==", userRef));
    const data = await getDocs(q);

    let ref = data.docs[0].ref;
    await updateDoc(ref, {items: []});
    const newData = await getDocs(q);
    if (newData.docs[0]) {
      dispatch(
        setUserCart({
          ...newData.docs[0].data(),
          id: newData.docs[0].data(0).uid,
        })
      );
    }
  };

  return (
    <div className="sectionContainer secPad">
      <div className="cartTitle">
        <div className="shopping-cart">
          <div className="title">Shopping Bag</div>

          {cartItems.map(({item, count}) => (
            <div className="item">
              <div className="buttons">
                <span
                  className="delete-btn"
                  onClick={() => removeToCart(item.ref)}
                ></span>
              </div>

              <div className="image">
                <img src={item.ProductImage} alt="Image1"/>
              </div>

              <div className="description ">
                <span>{item.itemName}</span>
                <span>{item.price} AMD</span>
              </div>

              <div className="quantity">
                <button
                  className="minus-btn addRemoveBtn"
                  type="button"
                  name="button"
                  onClick={() => decrease(item.ref)}
                >
                  <img
                    src="https://designmodo.com/demo/shopping-cart/minus.svg"
                    alt="Cart"
                  />
                </button>
                <input type="text" name="name" value={count}/>
                <button
                  className="plus-btn addRemoveBtn"
                  type="button"
                  name="button"
                  onClick={() => increase(item.ref)}
                >
                  <img
                    src="https://designmodo.com/demo/shopping-cart/plus.svg"
                    alt="Cart"
                  />
                </button>
              </div>

              <div className="total-price">{item.price * count} AMD</div>
            </div>
          ))}

          <div className="total">
            <div>Total {total} AMD</div>
            <div>
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "#43bf1a",
                  },
                }}
                onClick={handleClickOpen}
              >
                Go To Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      {cartItems.length ? (
        <CartPayment
          onclose={handleClose}
          open={open}
          emptyCart={() => getEmptyCart()}
        />
      ) : null}
    </div>
  );
}

export default Cart;
