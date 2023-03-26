import React, {useEffect, useState} from 'react';
import {addItemsStyles} from "../../assets/styles";
import {collection, addDoc, getDocs, serverTimestamp, onSnapshot} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

import {db, storage} from "../../firebase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {categoriesList} from "../../utilites/categories";
import FormControl from "@mui/material/FormControl";

const AddItems = () => {
  const classes = addItemsStyles()
  const [file, setFile] = useState("");
  const [imageRef, setImageRef] = useState('');
  const [categories, setCategories] = useState("");
  const [allBrands, setAllBrands] = useState([])
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [addItems, setAddItems] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [textarea, setTextarea] = useState('')
  const [per, setPer] = useState(null);


  useEffect(() => {
    const getBrands = async () => {
      const querySnapshot = await getDocs(collection(db, "brands"));
      querySnapshot.forEach((doc) => {
        let newBrandList = []
        querySnapshot.docs.forEach((doc) => {
          newBrandList.push({id: doc.id, ...doc.data()})
        })

        setAllBrands(newBrandList)
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
    }
    return () => {
      getBrands()
    }
  }, [])

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

  const uploadFile = () => {
    // const name = new Date().getTime() + file.name;
    const storageRef = ref(storage
      , file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPer(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageRef(downloadURL);
        });
      }
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {

      const docRef = await addDoc(collection(db, "items"), {
        name: itemName,
        price: itemPrice,
        text: textarea,
        brandName: brandName,
        image: imageRef,
        categories: categories

      });

      setItemPrice(0);
      setTextarea('');
      setItemName('');
      setBrandName('');
      setFile('');
      setImageRef('');
      setCategories('')
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      <h1>Add Items</h1>
      <div>
        <form>

          <input type="text" placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)}/>
          <input type="number" placeholder='Price' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>

          <div>
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
          <textarea placeholder='Enter Desctiption' rows='10' cols='80' value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}/>
          <div>
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
                }
                alt=""
              />
            </div>

            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={handleClear}>Clear image</button>

          </div>

          <button onClick={handleAdd}>Add Item</button>


        </form>
      </div>
    </div>
  );
};

export default AddItems;