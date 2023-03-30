import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {collection, onSnapshot} from "@firebase/firestore";
import {db} from "../../firebase";

const AllItems = () => {
  let formId = 1;
  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [products, setProducts] = useState([]);

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
  };

  const onDelete = (id) => {
    setDeleteRow(id);
  };

  return (
    <div>
      <h2>All items</h2>
      <div style={{height: 400, width: '100%', backgroundColor: '#fff', margin: "20px"}}>
        <DataGrid
          onGridStateChange={console.log}
          sx={{maxWidth: "100%"}}
          columns={[
            {field: "formId", headerName: "ID"},
            {
              field: "image",
              headerName: "Image URL",
              width: 150,
              renderCell: (params) => (
                <img
                  src={params.value}
                  alt="Pic"
                  style={{width: 50, height: 50, objectFit: "cover", borderRadius: '50%'}}
                  key={params.id}
                />
              ),
            },
            {field: "name", headerName: "Name", editable: true,},
            {field: "brandName", headerName: "Brand Name"},
            {field: "categories", headerName: "Categories"},
            {field: "price", headerName: "Price"},
            {field: "description", headerName: "Description", width: 300},
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

          rows={products.map(
            ({
               id,
               brandName,
               price,
               description,
               image,
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
            })
          )}
        />

      </div>
    </div>
  );
};

export default AllItems;