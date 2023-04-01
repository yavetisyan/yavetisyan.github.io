import React, {useEffect, useState} from 'react';
import {addDoc, collection, getDocs, onSnapshot} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

import {db, storage} from "../../firebase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {categoriesList} from "../../utilites/categories";
import FormControl from "@mui/material/FormControl";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddItems = () => {
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState("");
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [textarea, setTextarea] = useState('')
  const [per, setPer] = useState(null);
  const [imageRef, setImageRef] = useState('');
  const [imageName, setImageName] = useState('');


  useEffect(() => {
    const allBrandList = async () => await onSnapshot(collection(db, "brands"), (brands) => {
      setBrandList(
        brands.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          referance: doc.ref,
        }))
      );
    });
    return () => {
      allBrandList()
    }
  }, []);

  const onChangeBrand = async (e) => {
    setBrandName(e.target.value)

  }

  const handleClear = (e) => {
    e.preventDefault();
    setFile('')
  }


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      setImageName(name);
      const storageRef = ref(storage, `${categories} / ${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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


  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "items"), {
        name: itemName,
        price: itemPrice,
        description: textarea,
        brandName: brandName,
        image: imageRef,
        imageName: imageName,
        categories: categories

      });

      setItemPrice(0);
      setTextarea('');
      setItemName('');
      setBrandName('');
      setFile('');
      setImageRef('');
      setCategories('');
      setImageName('')

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <h1>Add Items</h1>
      <div>
        <form>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextField
              required
              id="outlined-basic"
              label="Item name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              required
              type='number'
              id="outlined-basic1"
              label="Price"
              variant="outlined"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <div style={{
              width: '150px',
            }}>
              <FormControl fullWidth>
                <InputLabel id="demo-controlled-open-select-label">
                  Brand name
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={(e) => setOpen(false)}
                  onOpen={(e) => setOpen(true)}
                  label="Brand"

                  value={brandName}
                  onChange={onChangeBrand}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brandList.map((brand, index) => (
                    <MenuItem value={brand.id} key={brand.id}>
                      {brand.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{
              width: '150px',
              marginTop: '20px'
            }}>
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  open={openCategories}
                  onClose={(e) => setOpenCategories(false)}
                  onOpen={(e) => setOpenCategories(true)}
                  value={categories}
                  label="Categories"
                  onChange={(e) => setCategories(e.target.value)}
                >
                  <MenuItem value="a">
                    <em>None</em>
                  </MenuItem>
                  {categoriesList.map((list) => (
                    <MenuItem key={list.categories} value={list.categories}>
                      {list.categories}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <textarea placeholder='Enter Desctiption' rows='10' cols='80' value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}/>
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
        </form>
      </div>

    </div>


  );
};

export default AddItems;