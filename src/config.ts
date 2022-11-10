// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0jtaiSy_Xe1ingOS2CgLFrN36MHVY4a0",
  authDomain: "msles-c4.firebaseapp.com",
  projectId: "msles-c4",
  storageBucket: "msles-c4.appspot.com",
  messagingSenderId: "705258406562",
  appId: "1:705258406562:web:79c06b39f5fc4181190dfb",
  measurementId: "G-H4B6LFKC92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)