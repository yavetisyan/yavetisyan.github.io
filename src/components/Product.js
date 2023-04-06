import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {selectUserId, selectUserProduct} from "store/slices/userSlices";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ScrollToTop from "./ScrollToTop";

const useStyle = makeStyles({
  top: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "40px 20px",
    borderRadius: "30px",
  },
  price: {
    fontSize: "50px",
    margin: "0 0 30px 0",
    padding: 0,
    color: "#2b6283",
  },
  btn: {
    width: "100%",
    fontSize: "50px",
    marginBottom: "30px",
  },
  descr: {
    wordSpacing: "5px",
    lineHeight: "25px",
  },
  sectrTitle: {
    marginTop: "30px",
  },
  shopCart: {
    cursor: "pointer",
    marginLeft: "20px",
    height: "50px",
  },
  titleName: {
    color: "rgb(161, 137, 121, 0.5)",
    fontSize: "50px",
  },
  box: {
    position: " absolute",
    left: " 50%",
    top: " 50%",
    transform: " translate(-50%, -50%)",
  },
});

function Product() {
  const classes = useStyle();
  const item = useSelector(selectUserProduct);
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const {itemId} = useParams();
  const [added, setAdded] = useState(true);

  console.log(item)
  const onAddItem = async (itemRef) => {
    // const userRef = db.collection("users").doc(userId);
    //
    // const response = collection(db, "cart");
    // const q = query(response, where("userRef", "==", userRef));
    // const data = await getDocs(q);
    // let ref = data.docs[0].ref;
    // await updateDoc(ref, {items: arrayUnion(itemRef)});
    //
    // const newData = await getDocs(q);
    //
    // if (newData.docs[0]) {
    //   dispatch(
    //     setUserCart({
    //       ...newData.docs[0].data(),
    //       id: newData.docs[0].data(0).uid,
    //     })
    //   );
    // }
    // setAdded(false);
  };

  const goTocart = () => {
    navigate("/cart");
  };
  const sighnIntoAdd = () => {
    navigate("/sign-in");
  };

  console.log(item)
  return (
     <div className="sectionContainer productTitle ">
       <Container maxWidth="lg">
         {/*{prodItem ? (*/}
         <Grid container spacing={5} className={classes.top}>
           <Grid item md={5}>
             <img
                src={item.image}
                alt={item.imageName}
             />
           </Grid>
           <Grid item md={7}>
             <h1>{item.name}</h1>
             <h2 className={classes.price}>{item.price} AMD</h2>

             {/*{userId ? (*/}
             {/*   added ? (*/}
             <>
               <Button
                  variant="contained"
                  // onClick={() => onAddItem(prodItem.ref)}
                  className={classes.btn}
               >
                 Add to Cart
                 <ShoppingCartIcon className={classes.shopCart}/>
               </Button>
             </>
             {/*) : (*/}
             <>
               <Button
                  variant="contained"
                  color="success"
                  onClick={goTocart}
                  className={classes.btn}
               >
                 Go to Cart
                 <ShoppingCartIcon className={classes.shopCart}/>
               </Button>
             </>
             {/*)*/}
             {/*) : (*/}
             {/*   <Button*/}
             {/*      onClick={sighnIntoAdd}*/}
             {/*      variant="contained"*/}
             {/*      className={classes.btn}*/}
             {/*   >*/}
             {/*     Add to cart*/}
             {/*     <ShoppingCartIcon className={classes.shopCart}/>*/}
             {/*   </Button>*/}
             {/*)*/}
             {/*}*/}

             <h3 className={classes.sectrTitle}>Description</h3>
             <p className={classes.descr}>{item.description}</p>
           </Grid>
         </Grid>
         {/*) : (*/}
         {/*   <NotfundPage/>*/}
         {/*)}*/}
         <ScrollToTop/>
       </Container>
     </div>
  );
}

export default Product;
