// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJTNBF9RcIoAFdFpd1ereDsZOUWnIRAWw",
  authDomain: "dnts-bd247.firebaseapp.com",
  databaseURL: "https://dnts-bd247-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dnts-bd247",
  storageBucket: "dnts-bd247.firebasestorage.app",
  messagingSenderId: "592533984741",
  appId: "1:592533984741:web:e24e80e5cb7f112eb70b0c",
  measurementId: "G-XHFEB7MDMR"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
