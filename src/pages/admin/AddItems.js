import React, {useEffect, useState} from 'react';
import {addItemsStyles} from "../../assets/styles";
import {collection, addDoc, getDocs, serverTimestamp, onSnapshot} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

import {db, storage} from "../../firebase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddItems = () => {
  const classes = addItemsStyles()
  const [file, setFile] = useState("");
  const [imageRef, setImageRef] = useState('');

  const [allBrands, setAllBrands] = useState([])
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [addItems, setAddItems] = useState('')
  const [itemName, setItemName] = useState(0)
  const [itemPrice, setItemPrice] = useState()
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onChangeBrand = async (e) => {
    setBrandName(e.target.value)

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
    uploadFile();
    try {
      const docRef = await addDoc(collection(db, "items"), {
        Name: itemName,
        Price: itemPrice,
        Text: textarea,
        BrandName: brandName,
        Image: imageRef
      });

      setItemPrice(0);
      setTextarea('');
      setItemName('');
      setBrandName('');
      setFile('');
      setImageRef('');
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

          <input type="text" placeholder='Item Name' onChange={(e) => setItemName(e.target.value)}/>
          <input type="number" placeholder='Price' onChange={(e) => setItemPrice(e.target.value)}/>

          <div>
            <InputLabel id="demo-controlled-open-select-label">
              Brand name
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={brandName}
              label="Brand name"
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

          <textarea type="text" placeholder='Enter Desctiption' rows='10' cols='80'
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
            <button onClick={() => setFile('')}>Clear image</button>

          </div>

          <button onClick={handleAdd}>Add Item</button>


        </form>
      </div>
    </div>
  );
};

export default AddItems;