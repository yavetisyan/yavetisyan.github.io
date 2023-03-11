import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKFuFuy7Dc_KzTkpBDsQEaZ1rCXGfV58w",
  authDomain: "online-shop-6cbb8.firebaseapp.com",
  projectId: "online-shop-6cbb8",
  storageBucket: "online-shop-6cbb8.appspot.com",
  messagingSenderId: "265913380615",
  appId: "1:265913380615:web:d87f123ff4d717857ddfa2",
  measurementId: "G-SJJDHBM7F1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);

