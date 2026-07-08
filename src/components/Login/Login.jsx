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

    <div className="bg-gray-100">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#8a2cd6] to-gray-100 text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-5">
          <h1 className="text-6xl font-bold">Gadget Heaven</h1>
          <p className="text-xl mt-5">
            Your Trusted Online Gadget Store
          </p>

          <button
            onClick={() =>
              document
                .getElementById("login")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="btn mt-8 bg-white text-[#8a2cd6] border-none"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold">About Gadget Heaven</h1>

          <p className="mt-6 text-lg text--600">
            Gadget Heaven is one of Bangladesh's trusted online gadget stores.
            We provide original smartphones, laptops, smart watches,
            accessories and fast delivery with secure payment.
          </p>
        </div>
      </section>

      {/* Services */}

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-5">

          <h1 className="text-4xl font-bold text-center mb-12">
            Our Services
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="card bg-base-100 shadow-xl p-8 text-center hover:scale-105 duration-300">
              <div className="text-6xl">📱</div>
              <h2 className="font-bold text-2xl mt-4">
                Smartphones
              </h2>
            </div>

            <div className="card bg-base-100 shadow-xl p-8 text-center hover:scale-105 duration-300">
              <div className="text-6xl">💻</div>
              <h2 className="font-bold text-2xl mt-4">
                Laptops
              </h2>
            </div>

            <div className="card bg-base-100 shadow-xl p-8 text-center hover:scale-105 duration-300">
              <div className="text-6xl">⌚</div>
              <h2 className="font-bold text-2xl mt-4">
                Smart Watches
              </h2>
            </div>

            <div className="card bg-base-100 shadow-xl p-8 text-center hover:scale-105 duration-300">
              <div className="text-6xl">🎧</div>
              <h2 className="font-bold text-2xl mt-4">
                Accessories
              </h2>
            </div>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-5">

          <h1 className="text-4xl font-bold text-center">
            Why Choose Us
          </h1>

          <div className="grid md:grid-cols-2 gap-5 mt-12">

            <div className="alert shadow">
              ✅ 100% Original Products
            </div>

            <div className="alert shadow">
              🚚 Fast Delivery
            </div>

            <div className="alert shadow">
              🔒 Secure Payment
            </div>

            <div className="alert shadow">
              🛡 Official Warranty
            </div>

            <div className="alert shadow">
              🔄 Easy Return Policy
            </div>

            <div className="alert shadow">
              📞 24/7 Customer Support
            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="bg-gray-300 text-[#9538E2] py-20">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

            <div>
              <h1 className="text-5xl font-bold">10K+</h1>
              <p>Customers</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold">5000+</h1>
              <p>Products</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold">200+</h1>
              <p>Brands</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold">99%</h1>
              <p>Positive Reviews</p>
            </div>

          </div>

        </div>

      </section>

      {/* How To Order */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-5">

          <h1 className="text-4xl font-bold text-center">
            How To Order
          </h1>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mt-12">
            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">1. Register</div>

            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">2. Login</div>

            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">3. Browse</div>

            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">4. Add Cart</div>

            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">5. Checkout</div>

            <div className="card bg-base-100 text-lg font-bold shadow p-6 text-center">6. Receive</div>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="bg-gradient-to-b from-white to-gray-300 text-black py-20">

        <div className="max-w-6xl mx-auto px-5 text-center">

          <h1 className="text-4xl font-bold">
            Contact Us
          </h1>

          <p className="mt-8">
            📍 House-25, Road-10, Dhanmondi, Dhaka
          </p>

          <p>
            📞 +8801712345678
          </p>

          <p>
            📧 support@gadgetheaven.com
          </p>

        </div>

      </section>

      {/* Login */}

      <section
        id="login"
        className="login-bg py-24 flex items-center justify-center"
      >
        <div className="relative z-10 w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

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
      </section>

    </div>
  );

};

export default Login;