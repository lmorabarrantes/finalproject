// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgby48VxpBCQ5RCdcwvkOkCjsV1ap2LOM",
  authDomain: "react-d4fda.firebaseapp.com",
  projectId: "react-d4fda",
  storageBucket: "react-d4fda.appspot.com",
  messagingSenderId: "359924200803",
  appId: "1:359924200803:web:36459a9efb2e8af0f44f56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
