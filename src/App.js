//import logo from "./logo.svg";
import React, {useCallback, useContext, useEffect} from "react";
import "./App.css";
import Main from "./components/Maket/Main";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, setUser, setUserCart} from "./store/slices/userSlices";
import {auth, db} from "./firebase";
import AdminContext from "context/AdminContext";
import {collection, getDocs, query, where} from "@firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const {setGoogleProfileImg} = useContext(AdminContext);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleProfileImg(user.photoURL);

        dispatch(setUser(user));
      } else {
        setGoogleProfileImg(null);
        dispatch(setUser(null));
        dispatch(setUserCart(null));
      }
    });
  }, [dispatch, setGoogleProfileImg]);

  const getUserCart = useCallback(
    async (userId) => {
      const userRef = db.collection("users").doc(userId);
      const response = collection(db, "cart");
      const q = query(response, where("userRef", "==", userRef));
      const data = await getDocs(q);

      if (data.docs[0]) {
        dispatch(
          setUserCart({...data.docs[0].data(), id: data.docs[0].data(0).uid})
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (userId) {
      getUserCart(userId);
    }
  }, [userId, getUserCart]);

  return <Main/>;
}

export default App;
