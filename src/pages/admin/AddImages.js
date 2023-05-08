import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {addDoc, collection} from "firebase/firestore";
import {db, storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {DataGrid} from "@mui/x-data-grid";
import DeleteIetemDialog from "../../components/DeleteItemDialog";
import {onSnapshot} from "@firebase/firestore";

const AddImages = () => {
  let formId = 1;
  const [file, setFile] = useState("");
  const [imageRef, setImageRef] = useState('');
  const [per, setPer] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [imageName, setImageName] = useState('');


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      setImageName(name);
      const storageRef = ref(storage, `Carousel/ ${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ;
          // console.log("Upload is " + progress + "% done");
          setPer(progress);

          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log('Upload image error - ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageRef(downloadURL);
            // console.log('File available at', downloadURL);

          });
        }
      );
    };
    file && uploadFile()
  }, [file])
  const handleClear = (e) => {
    e.preventDefault();
    setFile('')
  }


  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "carousel"), {
        image: imageRef,
        imageName: imageName,
        categories: 'Carousel'
      });
      setImageRef('');
      setFile('');
      setImageName('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getItems = onSnapshot(
      collection(db, 'carousel'),
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
      <div>
        <div className="left">
          <img
            style={{width: 100}}
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
            }
            alt=""
          />
        </div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <Button variant={'contained'} onClick={handleClear}>Clear image</Button>
      </div>
      <Button variant={'contained'} onClick={handleAdd}>Add Item</Button>

      <div>

        <div>
          <h2 style={{marginTop: '20px'}}>All items</h2>
          <div style={{height: 300, width: '70%', backgroundColor: '#fff', margin: "50px 20px"}}>
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
                   imageName,
                   image,
                   categories

                 }) => ({
                  id,
                  formId: formId++,
                  imageName,
                  image,
                  categories
                })
              )}
            />

          </div>
          {deleteRow &&
            <DeleteIetemDialog item={deleteRow} onClose={() => setDeleteRow(null)} onOpen={() => setOpenDialog(true)}
                               name={'carousel'}/>}
        </div>
      </div>
    </div>
  );
};

export default AddImages;
