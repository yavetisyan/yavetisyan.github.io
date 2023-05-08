import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {db} from "../firebase";
import {arrayUnion, collection, getDocs, query, updateDoc, where,} from "@firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, selectUserProduct, setUserCart, setUserProduct} from "store/slices/userSlices";
import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
  card: {
    width: "250px",
    height: "350px",
    margin: "15px 20px 15px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    alignItems: "center",
    textAlign: "center,",
    "&:hover img": {
      transform: "scale(1.1)",
    },
    "& .MuiCardMedia-root": {
      width: "100%",
    },
  },

  cardMedia: {
    cursor: "pointer",
    maxWidth: "100%",
    height: "220px",
    objectFit: "fill",
    transition: "all .5s ease-in-out",
    marginBottom: "10px",
  },
  cardAction: {
    display: "flex",
    justifyContent: "center",
  },
});

const Items = ({items, referance}) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkItem, setCheckItem] = useState(false);
  const [product, setProduct] = useState({});
  const userId = useSelector(selectUserId);

  const asd = useSelector(selectUserProduct);


  const onAddproducts = (item) => {
    // setProduct(item);
    dispatch(setUserProduct(item))
    // setCheckItem(true);
    navigate(`/product/${item.id}`);
  };

  const sighnIntoAdd = () => {
    navigate("/sign-in");
  };

  const onAddItem = async (itemRef) => {
    const userRef = db.collection("users").doc(userId);

    const response = collection(db, "cart");
    const q = query(response, where("userRef", "==", userRef));
    const data = await getDocs(q);
    let ref = data.docs[0].ref;
    await updateDoc(ref, {items: arrayUnion(itemRef)});

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
    <div>
      <Card className={classes.card} style={{transition: "all .3s"}}>
        <CardMedia
          component="img"
          alt="Pic"
          image={items.image}
          onClick={() => onAddproducts(items)}
          className={classes.cardMedia}
          sx={{height: 200, objectFit: "fill", width: "200px"}}
        />
        <CardContent sx={{p: 0, textAlign: "center"}}>
          <Typography gutterBottom variant="p" component="div">
            {items.itemName}
          </Typography>
        </CardContent>
        <CardContent sx={{p: 0}}>
          <Typography gutterBottom variant="h5" component="div">
            {items.price} AMD
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          {userId ? (
            <Button
              onClick={() => onAddItem(referance)}
              sx={{
                border: "none",
                backgroundColor: "#d32f2f",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "10px",
                fontWeight: " bold",
                ":hover": {
                  backgroundColor: "#5a1212",
                },
              }}
            >
              Add to cart
            </Button>
          ) : (
            <Button
              sx={{
                border: "none",
                backgroundColor: "#d32f2f",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "10px",
                fontWeight: " bold",
                ":hover": {
                  backgroundColor: "#5a1212",
                },
              }}
              onClick={() => sighnIntoAdd()}
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Card>

    </div>

  );
};

export default Items;
