import React, { useContext } from "react";
import toytopia from "../assets/toytopia.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  
  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center py-5  bg-base-100">
        <img src={toytopia} alt="" height="250" width="250" />
      </div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <NavLink className="btn btn-ghost text-xl text-blue-500" to="/">
            toyTopia
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex font-semibold text-[16px]">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/all-toys">All Toys</NavLink>
            </li>

            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-toys">All Toys</NavLink>
              </li>
              
              <li>
                <NavLink to="/profile">My Profile</NavLink>
              </li>
            </ul>
          </div>
          {user?.uid ? (
            <div>
              <div className="avatar" title={user?.displayName}>
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL} />
                  
                </div>
              </div>

              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </div>
          ) : (
            <Link className="btn" to="/auth/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
