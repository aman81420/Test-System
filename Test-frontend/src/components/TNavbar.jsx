import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets";

const TNavbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext); // token is true if user is logged in

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/Login");
  };
  const login = () => {
    navigate("/Login");
  };
  const addTestHandler = () => {
    navigate("/TAddQues");
  };

  return (
    <nav className="w-full h-[4rem] flex justify-between items-center px-6 bg-[#f4f7fc] text-[#2a4365] border-b border-gray-300">
      {/* Logo */}
      <i className="hover:cursor-pointer text-[#3182ce] text-4xl fa-brands fa-pied-piper"></i>

      {/* Navigation Links */}
      <div>
        <ul
          onClick={addTestHandler}
          className="text-lg font-semibold hover:text-[#3182ce] transition duration-300 cursor-pointer"
        >
          Add Test
        </ul>
      </div>

      {/* User Actions */}
      <div>
        {!token && !userData ? (
          <button
            onClick={login}
            className="bg-[#3182ce] text-white font-semibold px-4 py-1 rounded-md hover:bg-[#225d9c] transition duration-300"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <img
              className="w-10 h-10 rounded-full border border-gray-300"
              src={assets.userImg}
              alt="User"
            />
            <button
              onClick={logout}
              className="bg-[#3182ce] text-white font-semibold px-4 py-1 rounded-md hover:bg-[#2b6cb0] transition duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TNavbar;
