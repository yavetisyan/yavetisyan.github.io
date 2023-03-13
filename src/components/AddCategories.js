import React, {useState} from "react";
import Pagination from "@mui/material/Pagination";
import {Container} from "@mui/material";
import Items from "./Items";
import {makeStyles} from "@mui/styles";

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
  const [filteredItems, setFilteredItems] = useState([]);


  const itemsPage = 8;
  const [page, setPage] = useState(1);
  const numOfPages = Math.ceil(filteredItems.length / itemsPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg">
      <h1 className="toysText">For -direc name-</h1>
      <div className={classes.categoriesBox}>
        {filteredItems
          .slice((page - 1) * itemsPage, page * itemsPage)
          .map((item) => (
            <div key={item.id}>
              <Items items={item} referance={item.ref} key={item.id}/>
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

      {/*{addItem && <AddToCard item={addItem} onClose={() => setAddItem(null)}/>}*/}
    </Container>
  );
};

export default AddCategories;
