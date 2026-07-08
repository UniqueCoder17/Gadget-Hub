import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.int";
import { signOut, onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === "/home";

    const [user, setUser] = useState(null);

    // Firebase Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Logout
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        navigate("/login");
    };

    return (
        <div
            className={`navbar ${isHomePage
                ? "bg-[#9538E2] text-white rounded-3xl"
                : "bg-white text-black"
                } p-4`}
        >
            {/* Left */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        ☰
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-400 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <NavLink to="/home">Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/statistics">Statistics</NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>

                        <li>
                            <NavLink to="/about">About Us</NavLink>
                        </li>

                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>

                        {!user ? (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>

                                <li className="font-bold text-xl text-white">
                                    Hi! {user.displayName || user.email}
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <h1 className="text-xl font-bold">Gadget Heaven</h1>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/statistics">Statistics</NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about">About Us</NavLink>
                    </li>

                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>

                    {!user ? (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    ) : (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end flex items-center gap-4">

                {user && (
                    <span className="font-bold text-lg whitespace-nowrap">
                        Hi! {user && user.displayName && (
                            <span className="font-semibold text-lg">
                                {user.displayName}
                            </span>
                        )}
                    </span>
                )}

                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <NavLink to="/dashboard">
                        <TiShoppingCart className="w-8 h-8 text-gray-600" />
                    </NavLink>
                </button>

                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <NavLink to="/dashboard">
                        <FaRegHeart className="w-6 h-6 text-gray-600" />
                    </NavLink>
                </button>

            </div>
        </div>
    );
};

export default NavBar;