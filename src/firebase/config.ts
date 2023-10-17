// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuT10Xoj4fPhjBO2XGsx9HQAvWYLI0O1I",
  authDomain: "barangay-management-syst-b5c6d.firebaseapp.com",
  projectId: "barangay-management-syst-b5c6d",
  storageBucket: "barangay-management-syst-b5c6d.appspot.com",
  messagingSenderId: "388164707207",
  appId: "1:388164707207:web:5fa253cc88ae459d67e922",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

export { firebaseStorage };
