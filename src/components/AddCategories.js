import React, {useEffect, useState} from "react";
import Pagination from "@mui/material/Pagination";
import {Container} from "@mui/material";
import Items from "./Items";
import {makeStyles} from "@mui/styles";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";

const useStyle = makeStyles({
  categoriesBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  pagnition: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});

const AddCategories = ({categoriesName}) => {
  const classes = useStyle();
  const itemsPage = 8;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const numOfPages = Math.ceil(items.length / itemsPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const q = query(collection(db, "items"), where("categories", "==", categoriesName));
        const querySnapshot = await getDocs(q);
        let newItems = [];
        querySnapshot.forEach((doc) => {
          newItems.push({id: doc.id, ...doc.data()})
          setItems(newItems)
        });
      } catch (e) {
        console.log('categories error - ', e.message)
      }
    }

    getAccessories()
    return () => {
      getAccessories()
    }
  }, [categoriesName])


  return (
    <Container maxWidth="lg">
      <h1 className="toysText">For {categoriesName}</h1>
      <div className={classes.categoriesBox}>

        {items.map((item) => (
          <Items items={item} referance={item.ref} key={item.id}/>
        ))}
      </div>

      <div>
        <Pagination
          count={numOfPages}
          color="primary"
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          className={classes.pagnition}
        />
      </div>

      {/*{addItem && <AddToCard item={addItem} onClose={() => setAddItem(null)}/>}*/}
    </Container>
  );
};

export default AddCategories;
