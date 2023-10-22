// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "mern-auth-f6484.firebaseapp.com",
  projectId: "mern-auth-f6484",
  storageBucket: "mern-auth-f6484.appspot.com",
  messagingSenderId: "777123005950",
  appId: "1:777123005950:web:dcf5b65b5d2c61bca0acaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);