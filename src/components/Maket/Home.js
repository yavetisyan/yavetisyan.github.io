import React, { useContext, useState } from "react";
import SliderItems from "slider/SliderItems";
import Items from "components/pages/Items";
import ProductsContext from "context/ProductsContext";
import AddToCard from "components/pages/AddToCard";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  button: {
    "& .MuiPaginationItem-root": {
      background: "#fff",
      color: "#000",
    },
  },
  div: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pagnition: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export const Home = () => {
  const classes = useStyle();
  const { products } = useContext(ProductsContext);
  const { addItem, setAddItem } = useContext(ProductsContext);

  const itemsPage = 4;
  const [page, setPage] = useState(1);
  const numOfPages = Math.ceil(products.length / itemsPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="sectionContainer secPad">
      <h2 className="toysText">TOYS</h2>
      <SliderItems />
      <h1 className="toysText">Best Gifts</h1>

      <div className={classes.div}>
        {products
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
          classes={{ button: classes.button }}
          className={classes.pagnition}
        />
      </div>
      {addItem && <AddToCard item={addItem} onClose={() => setAddItem(null)} />}
    </div>
  );
};

export default Home;
