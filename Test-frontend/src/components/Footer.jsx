import React from "react";
import assets from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#f4f7fc] text-[#2a4365] border-t border-gray-300 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto space-y-3 md:space-y-0">
        {/* Copyright Section */}
        <div>
          <p className="text-sm font-medium text-center md:text-left">
            © 2024 LeetCode. All rights reserved.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center space-x-4 text-sm">
          {["Help Center", "Terms", "Privacy Policy"].map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>|</span>}
              <p className="hover:cursor-pointer hover:text-[#3182ce] transition duration-300">
                {item}
              </p>
            </React.Fragment>
          ))}
        </div>

        {/* Country Section */}
        <div className="flex items-center space-x-2">
          <img className="h-5 w-5 rounded-full" src={assets.flag} alt="Flag" />
          <span className="font-medium">Bharat</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
