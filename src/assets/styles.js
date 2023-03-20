import {makeStyles} from "@mui/styles";

export const addItemsStyles = makeStyles({
  addForm: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    margin: "20px 0",
  },
  c: {
    display: "flex",
    flexDirection: "column",
  },
  textArea: {
    width: "400px",
    resize: "none",
  },
  addImage: {
    display: "flex",
    flexDirection: "column",
  },
  imageBox: {
    border: "1px solid #000",
    width: "300px",
    height: "220px",
  },
  showImage: {
    width: "300px",
    height: "200px",
    objectFit: "cover",
  },
});
