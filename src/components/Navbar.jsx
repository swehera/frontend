// Navbar.js

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/App_context";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AppContext);

  const logout = () => {
    logOut(); // Call the logOut function from the context
  };

  return (
    <header className="flex-col md:flex items-center justify-between sticky top-0 py-2 px-6 bg-white/90 shadow-md">
      <div>
        <Link to={"/"}>
          <p className="text-[20px] font-bold text-pink-600 text-center md:text-left">
            FoodStore
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        {isAuthenticated && (
          <div className="flex items-center justify-center mx-1">
            <Link to={"/add"}>
              <button className=" mx-2 font-semibold">Post</button>
            </Link>
            <Link to={"/profile"}>
              <button className=" mx-2 font-semibold">Profile</button>
            </Link>
            <button className=" mx-2 font-semibold" onClick={logout}>
              Logout
            </button>{" "}
            {/* Call logout function */}
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex items-center justify-center mx-1">
            <Link to={"/login"}>
              <button className=" mx-2 font-semibold">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className=" mx-2 font-semibold">Register</button>
            </Link>
          </div>
        )}
        <Link to={"/saved"}>
          <button className=" mx-2 font-semibold">Saved</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
