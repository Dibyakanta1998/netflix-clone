// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC03Ehdozpt4xBYWcpjCbHzrRFBNUUEu0A",
  authDomain: "netflix-clone-1a48e.firebaseapp.com",
  projectId: "netflix-clone-1a48e",
  storageBucket: "netflix-clone-1a48e.firebasestorage.app",
  messagingSenderId: "887177607162",
  appId: "1:887177607162:web:39a12dc0beb899b1369643",
  measurementId: "G-LLVH067E36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default analytics;
