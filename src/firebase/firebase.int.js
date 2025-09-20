// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2S2VrZwvjDN2qUvr-mO3OIvbgM9SXt3I",
  authDomain: "gadget-hub-a5883.firebaseapp.com",
  projectId: "gadget-hub-a5883",
  storageBucket: "gadget-hub-a5883.firebasestorage.app",
  messagingSenderId: "893507403846",
  appId: "1:893507403846:web:0849755bd6f021f6240a47",
  measurementId: "G-TF8QTK6BGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;