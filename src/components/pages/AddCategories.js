import React, { useContext, useEffect, useState, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import {db} from "../../firebase";
import { collection, query, onSnapshot, where } from "@firebase/firestore";
import ProductsContext from "context/ProductsContext";
import AddToCard from "./AddToCard";
import { Container } from "@mui/material";
import Items from "./Items";
import CategoriesContext from "context/CategoriesContext";
import { makeStyles } from "@mui/styles";

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

const AddCategories = () => {
  const classes = useStyle();
  const { getCatName } = useContext(CategoriesContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const { addItem, setAddItem } = useContext(ProductsContext);

  const filterMan = useCallback(() => {
    const collRef = collection(db, "items");
    const q = query(collRef, where("categories", "==", getCatName));

    const f = onSnapshot(q, (snapshot) =>
      setFilteredItems(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          ref: doc.ref,
        }))
      )
    );

    return f;
  }, [getCatName]);

  useEffect(() => {
    filterMan();
  }, [filterMan]);

  const itemsPage = 8;
  const [page, setPage] = useState(1);
  const numOfPages = Math.ceil(filteredItems.length / itemsPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg">
      <h1 className="toysText">For {getCatName}</h1>
      <div className={classes.categoriesBox}>
        {filteredItems
          .slice((page - 1) * itemsPage, page * itemsPage)
          .map((item) => (
            <div key={item.id}>
              <Items items={item} referance={item.ref} key={item.id} />
            </div>
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

      {addItem && <AddToCard item={addItem} onClose={() => setAddItem(null)} />}
    </Container>
  );
};

export default AddCategories;
