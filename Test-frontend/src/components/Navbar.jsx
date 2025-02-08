import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/Login");
  };
  const login = () => {
    navigate("/Login");
  };

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-300">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo/Icon */}
        <i className="text-[#2a4365] text-4xl fa-brands fa-pied-piper hover:cursor-pointer"></i>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 justify-center">
          {["Home", "Contact", "About"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                isActive
                  ? "text-[#3182ce] font-semibold"
                  : "text-gray-700 hover:text-[#3182ce] transition duration-300"
              }
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Login/Logout Button */}
        <div className="hidden md:flex items-center">
          {!token ? (
            <button
              onClick={login}
              className="bg-[#3182ce] text-white font-semibold px-4 py-1 rounded-md hover:bg-[#2b6cb0] transition duration-300"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={logout}
                className="bg-[#3182ce] text-white font-semibold px-4 py-1 rounded-md hover:bg-[#2b6cb0] transition duration-300"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-300">
          {["Home", "Contact", "About"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition duration-300"
              onClick={() => setShowMenu(false)}
            >
              {item}
            </NavLink>
          ))}

          {/* Mobile Login/Logout */}
          <div className="px-6 py-3">
            {!token ? (
              <button
                onClick={login}
                className="w-full bg-[#3182ce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#2b6cb0] transition duration-300"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full bg-[#3182ce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#2b6cb0] transition duration-300"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
