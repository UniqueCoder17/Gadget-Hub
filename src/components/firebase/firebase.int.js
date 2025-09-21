// firebase.int.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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

// 🔹 Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export everything needed
export { app, analytics, auth, provider };
