import React, {useEffect, useState} from 'react';
import {addItemsStyles} from "../../assets/styles";
import {collection, query, where, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddItems = () => {
  const classes = addItemsStyles()
  const [file, setFile] = useState("");
  const [allBrands, setAllBrands] = useState([])
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);


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
  console.log(brandList)

  return (
    <div>
      <h1>Add Items</h1>
      <div>
        <form>

          <input type="text" placeholder='Item Name'/>
          <input type="number" placeholder='Price'/>
          <input type="text"/>

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

          <textarea type="text" placeholder='Enter Desctiption' rows='10' cols='80'/>
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

          <button>Add Item</button>


        </form>
      </div>
    </div>
  );
};

export default AddItems;