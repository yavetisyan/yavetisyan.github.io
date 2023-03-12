// import React, {useCallback, useContext, useEffect} from "react";
// import ProductsContext from "context/ProductsContext";
// import {selectUserId} from "store/slices/userSlices";
// import {useSelector} from "react-redux";
// import {collection, getDocs} from "@firebase/firestore";
// import {db, storage} from "../../firebase";
//
//
// function Navbar() {
//   const {setProducts, setSliderUrl} = useContext(ProductsContext);
//   const userId = useSelector(selectUserId);
//
//   const addProduct = useCallback(async () => {
//     try {
//       const products = await getDocs(collection(db, "items"));
//       const productArray = [];
//       products.forEach((doc) => {
//         const obj = {
//           ...doc.data(),
//           id: doc.id,
//           cart: false,
//           ref: doc.ref,
//         };
//
//         productArray.push(obj);
//       });
//       setProducts(productArray);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [setProducts]);
//
//   useEffect(() => {
//     addProduct();
//   }, [addProduct]);
//
//   useEffect(() => {
//     const fetchImages = async () => {
//       let result = await storage.ref().child("slider").listAll();
//       let urlPromises = result.items.map((imageRef) =>
//         imageRef.getDownloadURL()
//       );
//
//       return Promise.all(urlPromises);
//     };
//     const loadImages = async () => {
//       const urls = await fetchImages();
//       setSliderUrl(urls);
//     };
//     loadImages();
//   }, [setSliderUrl]);
//
//   return (
//     <div>
//
//     </div>
//   );
// }
//
// export default Navbar;
