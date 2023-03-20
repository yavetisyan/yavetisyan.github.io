import React, {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {DataGrid} from "@mui/x-data-grid";
import {collection, getDocs} from "@firebase/firestore";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import AddBrand from "../../components/AddBrand";
import {TextareaAutosize} from "@mui/material";
import {db} from "../../firebase";
import EditItemDialog from "../../components/EditItemDialog";
import DeleteIetemDialog from "../../components/DeleteItemDialog";


const useStyle = makeStyles({
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

const AdminOld = () => {
  const classes = useStyle(0);
  let formId = 1;

  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [categories, setCategories] = useState("");

  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);

  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");

  const [productImg, setProductImg] = useState({});
  const [sliderImg, setSliderImg] = useState({});
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");

  const [setProgress] = useState(0);

  const type = ["image/png", "image/jpeg"];
  const Input = styled("input")({
    display: "none",
  });

  const categoriesList = [
    {categories: "Boys"},
    {categories: "Girls"},
    {categories: "Accessories"},
  ];

  // useEffect(() => {
  //   onSnapshot(collection(db, "brands"), (brands) => {
  //     setBrandList(
  //       brands.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //         referance: doc.ref,
  //       }))
  //     );
  //   });
  // }, []);

  // const addProduct = useCallback(async () => {
  //   try {
  //     const products = await getDocs(collection(db, "items"));
  //     const productArray = [];
  //     products.forEach((doc) => {
  //       const obj = {
  //         ...doc.data(),
  //         id: doc.id,
  //         cart: false,
  //         ref: doc.ref,
  //       };
  //       productArray.push(obj);
  //     });
  //     setProducts(productArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setProducts]);
  //
  // // Add items
  // const onAddItems = async () => {
  //   const brandsRef = collection(db, "items");
  //
  //   const payload = {
  //     categories,
  //     price,
  //     description,
  //     itemName,
  // /Admin    brandName: brandList.find((b) => b.id === brandName)?.brandName,
  //     brand: brandList.find((b) => b.id === brandName)?.referance,
  //     ProductImage: imageUrl,
  //   };
  //
  //   payload.price ? await addDoc(brandsRef, payload) : alert("Enter value");
  //   addProduct();
  //   setPrice("");
  //   setDescription("");
  //   setImageUrl("");
  //   setItemName("");
  //   setBrandName("");
  //   setCategories("");
  // };

  // add images

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && type.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // add image to firebase

  const addImageToStorage = (e) => {
    e.preventDefault();

    // const uploadImg = storage
    //   .ref(`items-images/${productImg.name}`)
    //   .put(productImg);
    //
    // uploadImg.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.random(
    //       (snapshot.bytesTransfreed / snapshot.totalBytes) * 100
    //     );
    //     setProgress(progress);
    //   },
    //   (error) => {
    //     alert("Upload Pic");
    //   },
    //   () => {
    //     storage
    //       .ref("items-images")
    //       .child(productImg.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         setImageUrl(url);
    //       });
    //   }
    // );
  };

  // add images slider

  const productImgHandlerSlider = (e) => {
    let selectedFiles = e.target.files[0];
    if (selectedFiles && type.includes(selectedFiles.type)) {
      setSliderImg(selectedFiles);
      setError("");
    } else {
      setSliderImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // add image to firebase

  const addImageToSlider = (e) => {
    e.preventDefault();

    // const uploadImg = storage.ref(`slider/${sliderImg.name}`).put(sliderImg);
    //
    // uploadImg.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.random(
    //       (snapshot.bytesTransfreed / snapshot.totalBytes) * 100
    //     );
    //     setProgress(progress);
    //   },
    //   (error) => {
    //     alert("Upload Pic");
    //   },
    //   () => {
    //     storage
    //       .ref("slider")
    //       .child(sliderImg.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         console.log(url);
    //         setImageUrl(url);
    //       });
    //   }
    // );
  };

  // change brand value
  const onChangeBrand = async (e, o) => {
    setBrandName(e.target.value);

    let a;
    const brandCol = collection(db, "brands");
    const brandRef = await getDocs(brandCol);

    brandRef.docs.map((ref) => {
      a = ref;
      return a;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseC = () => {
    setOpenC(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenC = () => {
    setOpenC(true);
  };

  const onEditRow = (id) => {
    setEditingRow(id);
  };

  const onDelete = (id) => {
    setDeleteRow(id);
  };

  const onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  return (
    <Container maxWidth="lg" className="sectionContainer">
      <AddBrand/>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {m: 1, width: "25ch"},
        }}
        noValidate
        autoComplete="off"
      >
        <div className={classes.addForm}>
          {/*add items */}

          <div className={classes.addItems}>
            {/*add brand name*/}
            <FormControl sx={{m: 1, minWidth: 215}}>
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
                {brandList.map((brand) => (
                  <MenuItem value={brand.id} key={brand.id}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              id="filled-required"
              label="Item Name"
              variant="filled"
              autoComplete="off"
              placeholder="Enter Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <TextField
              id="filled-number"
              label="Price"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={price}
              variant="filled"
              onChange={(e) => setPrice(e.target.value)}
            />

            {/*add categories*/}
            <FormControl sx={{m: 1, minWidth: 215}}>
              <InputLabel>Categories</InputLabel>
              <Select
                open={openC}
                onClose={handleCloseC}
                onOpen={handleOpenC}
                value={categories}
                label="Categories"
                onChange={onChangeCategories}
              >
                <MenuItem value="">
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

          {/*add description*/}
          <div>
            <TextareaAutosize
              minRows={18}
              aria-label="maximum height"
              placeholder="Enter Desctiption"
              defaultValue={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.textArea}
            />
          </div>

          {/*add image*/}
          <div className={classes.addImage}>
            <div className={classes.imageBox}>
              <img
                // src={
                //   imageUrl
                //     ? imageUrl
                //     : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUifa5xG4i4H7hdshBpmEQXICfDNfh9LWBARnvizvuF8GrJjjyL-ID-F7PR42vL1trYw&usqp=CAU"
                // }
                alt="uploaded_image"
                className={classes.showImage}
              />
            </div>

            <div clasName={classes.showImage}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="*"
                    id="icon-button-file"
                    type="file"
                    onChange={productImgHandler}
                  />

                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera sx={{fontSize: 40}}/>
                    <div style={{marginLeft: 20}}>
                      {productImg && <CheckCircleIcon/>}
                    </div>
                  </IconButton>
                  {error && (
                    <span style={{marginLeft: 30, color: "red"}}>
                      {error}
                    </span>
                  )}
                </label>

                <Button
                  onClick={addImageToStorage}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Upload image
                </Button>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="icon-button-files">
                  <Input
                    accept="*"
                    id="icon-button-files"
                    type="file"
                    onChange={productImgHandlerSlider}
                  />

                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera sx={{fontSize: 40}}/>
                    <div style={{marginLeft: 20}}>
                      {sliderImg && <CheckCircleIcon/>}
                    </div>
                  </IconButton>
                  {error && (
                    <span style={{marginLeft: 30, color: "green"}}>
                      {error}
                    </span>
                  )}
                </label>

                <Button
                  onClick={addImageToSlider}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Upload Slider Img
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <Button variant="contained" disableElevation>
          Add product
        </Button>
      </div>
      <div style={{height: 500, width: "100%", margin: "20px"}}>
        <DataGrid
          onGridStateChange={console.log}
          sx={{maxWidth: "100%"}}
          columns={[
            {field: "formId", headerName: "ID"},
            {
              field: "ProductImage",
              headerName: "Image URL",
              width: 150,
              renderCell: (params) => (
                <img
                  src={params.value}
                  alt="Pic"
                  style={{width: 80, height: 50, objectFit: "cover"}}
                />
              ),
            },
            {field: "brandName", headerName: "Brand Name"},
            {field: "categories", headerName: "Categories"},
            {
              field: "itemName",
              headerName: "Name",
              editable: true,
            },
            {field: "price", headerName: "Price"},
            {field: "description", headerName: "Description", width: 300},
            {
              field: "Edit",
              width: 100,
              headerName: "Edit",

              renderCell: (params) => {
                return [
                  <Button onClick={() => onEditRow(params.row)}>Edit</Button>,
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

          // rows={products.map(
          //   ({
          //      id,
          //      brandName,
          //      price,
          //      description,
          //      ProductImage,
          //      itemName,
          //      categories,
          //    }) => ({
          //     id,
          //     formId: formId++,
          //     categories,
          //     brandName,
          //     itemName,
          //     price,
          //     description,
          //     ProductImage,
          //   })
          // )}
        />
      </div>

      {editingRow && (
        <EditItemDialog item={editingRow} onClose={() => setEditingRow(null)}/>
      )}

      {deleteRow && (
        <DeleteIetemDialog item={deleteRow} onClose={() => setDeleteRow(null)}/>
      )}

    </Container>
  );
};

export default AdminOld;

