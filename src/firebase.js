import { createContext } from "react";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv7TAfBk8ceIhq0qwcrxBG5LKsh7q3VUg",
  authDomain: "shop-project-422d3.firebaseapp.com",
  projectId: "shop-project-422d3",
  storageBucket: "shop-project-422d3.appspot.com",
  messagingSenderId: "554597878948",
  appId: "1:554597878948:web:a6510aff272f4371c7aa31",
};

firebase.initializeApp(firebaseConfig);

export const Context = createContext(null);
const storage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();

export { storage, auth, db as default };
