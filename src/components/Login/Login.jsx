import { useEffect, useState } from "react";
import { auth, signInWithGoogle, logOut } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    signInWithGoogle().catch((err) => console.error(err));
  };

  const handleLogout = () => {
    logOut().catch((err) => console.error(err));
  };

  return (
    <div className="text-center mt-10">
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="profile" className="w-16 rounded-full mx-auto" />
          <p>Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
