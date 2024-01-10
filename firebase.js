
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxO_0ynu9hQkvJSfF2TDBORTuN8z1G15o",
  authDomain: "cosascreator.firebaseapp.com",
  projectId: "cosascreator",
  storageBucket: "cosascreator.appspot.com",
  messagingSenderId: "574345332750",
  appId: "1:574345332750:web:0111deb03d63a08cb6145f",
  measurementId: "G-75LEXQWLMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);