import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.int";

const Login = () => {
  const [user, setUser] = useState(null);

  // 🔹 Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔹 User state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {user ? (
        <div className="text-center">
          <img
            src={user.photoURL}
            alt="User"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
