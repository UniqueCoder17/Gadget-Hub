import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, provider } from "../firebase/firebase.int";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Login/Register Toggle
  const [isLogin, setIsLogin] = useState(true);

  // Form Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      setUser({
        ...result.user,
        displayName: name,
      });

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(result.user);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">
            Gadget Heaven
          </h1>

          <p className="text-gray-200 mt-2">
            {isLogin
              ? "Welcome back! Login to continue."
              : "Create your account."}
          </p>
        </div>

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-5"
        >
          {!isLogin && (
            <div>
              <label className="text-white font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full mt-2 bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="text-white font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mt-2 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full mt-2 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-white text-purple-700 hover:bg-purple-100 border-none text-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="divider text-white">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none"
        >
          Continue with Google
        </button>

        <p className="text-center text-white mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-300 font-bold ml-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;