import React, {useEffect, useState} from "react";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {DataGrid} from "@mui/x-data-grid";
import {collection, onSnapshot} from "@firebase/firestore";
import EditBrandItem from "../../components/EditBrandItem";
import DeleteBrandItem from "../../components/DeleteBrandItem";

const useStyle = makeStyles({
  brandBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    flexWrap: "wrap",
  },
});

function AddBrand() {
  const classes = useStyle();
  let formId = 1;
  const [brandName, setBrandName] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  const [allbrands, setAllBrands] = useState([])
  // add brand
  const onAddBrand = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "brands", brandName), {
        name: brandName.toUpperCase(),
        value: brandName.toUpperCase()
      });
      setBrandName('')
    } catch (e) {
      console.log('Add brand error - ', e)
    }

  };

  useEffect(() => {
    const getItems = onSnapshot(
      collection(db, 'brands'),
      (snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
          items.push({id: doc.id, ...doc.data()})
        });
        setAllBrands(items)
      },
      (error) => {
        console.log('All items - ', error.message)
      }
    );

    return () => {
      getItems()
    }
  }, [])
  const onEditRow = (id) => {
    setEditingRow(id);
    console.log(id)
  };

  const onDelete = (id) => {
    setDeleteRow(id);
    console.log(id)

  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": {m: 1, width: "25ch"},
      }}
      noValidate
      autoComplete="off"
    >
      <form
        onSubmit={onAddBrand}
        className={classes.brandBox}
      >
        <TextField
          required
          id="filled-required"
          label="Brand name"
          placeholder="Brand name"
          variant="filled"
          autoComplete="off"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <Button
          type='submit'
          variant="contained"
          disableElevation
          style={{marginLeft: 50}}
        >
          Add brand name
        </Button>
      </form>

      <div>
        <h2>All Brands</h2>
        <div style={{height: 400, backgroundColor: '#fff', margin: "20px"}}>
          <DataGrid
            onGridStateChange={console.log}
            sx={{padding: '10px 30px'}}
            columns={[
              {field: "name", headerName: "Brand Name", width: 150,},
              {
                field: "Edit",
                width: 100,
                headerName: "Edit",

                renderCell: (params) => {
                  return [
                    <Button key={params.id} onClick={() => onEditRow(params.row)}>Edit</Button>,
                  ];
                },
              },
              {
                field: "Delete",
                width: 100,
                headerName: "Delete",

                renderCell: (params) => {
                  return [
                    <Button onClick={() => onDelete(params.row)}>Delete</Button>,
                  ];
                },
              },
            ]}

            rows={allbrands.map(
              ({
                 id,
                 name,

               }) => ({
                id,
                formId: formId++,
                name,
              })
            )}
          />

        </div>

        {editingRow && <EditBrandItem item={editingRow} onClose={() => setEditingRow(null)}/>}
        {deleteRow &&
          <DeleteBrandItem item={deleteRow} onClose={() => setDeleteRow(null)} onOpen={() => setOpenDialog(true)}/>}
      </div>
    </Box>
  );
}

export default AddBrand;
