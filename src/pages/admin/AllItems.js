import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {collection, onSnapshot} from "@firebase/firestore";
import {db} from "../../firebase";
import DeleteIetemDialog from "../../components/DeleteItemDialog";
import EditItemDialog from "../../components/EditItemDialog";

const AllItems = () => {
  let formId = 1;
  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const getItems = onSnapshot(
      collection(db, 'items'),
      (snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
          items.push({id: doc.id, ...doc.data()})
        });
        setProducts(items)
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
    <div>
      <h2>All items</h2>
      <div style={{height: 600, width: '100%', backgroundColor: '#fff', margin: "20px"}}>
        <DataGrid
          onGridStateChange={console.log}
          sx={{maxWidth: "100%"}}
          columns={[
            {field: "formId", headerName: "ID", width: 10},
            {
              field: "image",
              headerName: "Image URL",
              width: 100,
              renderCell: (params) => (
                <img
                  src={params.value}
                  alt="Pic"
                  style={{width: 50, height: 50, objectFit: "cover", borderRadius: '50%'}}
                  key={params.id}
                />
              ),
            },
            {field: "name", headerName: "Name", editable: true, width: 80},
            {field: "brandName", headerName: "Brand Name"},
            {field: "categories", headerName: "Categories"},
            {field: "price", headerName: "Price", width: 60},
            {field: "description", headerName: "Description", width: 200},
            {
              field: "Edit",
              width: 80,
              headerName: "Edit",

              renderCell: (params) => {
                return [
                  <Button variant={'contained'} key={params.id} onClick={() => onEditRow(params.row)}>Edit</Button>,
                ];
              },
            },
            {
              field: "Delete",
              width: 100,
              headerName: "Delete",

              renderCell: (params) => {
                return [
                  <Button variant={'contained'} color='error' onClick={() => onDelete(params.row)}>Delete</Button>,
                ];
              },
            },
          ]}

          rows={products.map(
            ({
               id,
               brandName,
               price,
               description,
               image,
               imageName,
               name,
               categories,
             }) => ({
              id,
              formId: formId++,
              categories,
              brandName,
              name,
              price,
              description,
              image,
              imageName,
            })
          )}
        />

      </div>

      {editingRow && <EditItemDialog item={editingRow} onClose={() => setEditingRow(null)}/>}
      {deleteRow &&
        <DeleteIetemDialog item={deleteRow} onClose={() => setDeleteRow(null)} onOpen={() => setOpenDialog(true)}
                           name={'itmes'}/>}
    </div>
  );
};

export default AllItems;