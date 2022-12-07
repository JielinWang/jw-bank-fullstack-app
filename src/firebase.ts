// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBQ0tgJa19HenTN1cNu_B0zDQ5c9TZ9s4",
  authDomain: "jw-bank.firebaseapp.com",
  projectId: "jw-bank",
  storageBucket: "jw-bank.appspot.com",
  messagingSenderId: "503340163852",
  appId: "1:503340163852:web:ead04bc08a48ed91ad9f29"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
