// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp8d-caZim4EMdM_PpUjbORu1cncnJvg8",
  authDomain: "crud-react-49e55.firebaseapp.com",
  databaseURL: "https://crud-react-49e55-default-rtdb.firebaseio.com",
  projectId: "crud-react-49e55",
  storageBucket: "crud-react-49e55.firebasestorage.app",
  messagingSenderId: "857444817073",
  appId: "1:857444817073:web:0086625120bc153615ea90",
  measurementId: "G-FXX7KNJV0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//inicialize database
export const db = getDatabase(app);