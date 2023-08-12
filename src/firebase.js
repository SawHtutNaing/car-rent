// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAHZy8Ivb5G5tEfi2oIx_3MLr5Y0JoA4JE",
  // authDomain: "car-rentor-c1ab5.firebaseapp.com",
  // projectId: "car-rentor-c1ab5",
  // storageBucket: "car-rentor-c1ab5.appspot.com",
  // messagingSenderId: "682759476796",
  // appId: "1:682759476796:web:f3e406be0688ecc6a11539",

  // frist 
  apiKey: "AIzaSyBkR7hv5YHyRe-rwV4MFJuiYnNrLxZtgXM",
  authDomain: "car-renter-1.firebaseapp.com",
  projectId: "car-renter-1",
  storageBucket: "car-renter-1.appspot.com",
  messagingSenderId: "288527787913",
  appId: "1:288527787913:web:f2f6d04124f66245c36358"

  // second 

  // apiKey: "AIzaSyBtSm0WJUCXM68qbQkZaCpZ1Kx7P-U7Ow8",
  // authDomain: "car-rental--testing-mod.firebaseapp.com",
  // projectId: "car-rental--testing-mod",
  // storageBucket: "car-rental--testing-mod.appspot.com",
  // messagingSenderId: "731896502136",
  // appId: "1:731896502136:web:60849df4b83319cf75da8d"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
