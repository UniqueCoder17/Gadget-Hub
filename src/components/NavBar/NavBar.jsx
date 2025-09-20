import { NavLink, useLocation } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";

const NavBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className={`navbar ${isHomePage ? "bg-[#9538E2] text-white rounded-3xl" : "bg-white text-black"} p-4`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">

                    </div>
                    <ul className="menu menu-sm dropdown-content bg-gray-400 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="statistics">Statistics</NavLink></li>
                        <li><NavLink to="dashboard">Dashboard</NavLink></li>
                        <li><NavLink to ="profile">Profile</NavLink></li>
                        <li><NavLink to ="Login">Login</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Gadget Heaven</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="statistics">Statistics</NavLink></li>
                    <li><NavLink to="dashboard">Dashboard</NavLink></li>
                    <li><NavLink to ="profile">Profile</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end space-x-1">
                <button className="w-10 h-10 bg-white rounded-full">
                    <NavLink to='dashboard'><TiShoppingCart className="w-10 h-8 text-gray-600" /></NavLink>
                </button>
                <button className="w-10 h-10 bg-white rounded-full">
                    <NavLink to='dashboard'><FaRegHeart className="w-8 h-8 text-gray-600 ml-1" /></NavLink>
                </button>
            </div>
        </div>
    );
};

export default NavBar;