import React from 'react';
import assets from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-[#1a1919f0] text-[#958e8ef9] flex justify-around items-center h-12">
      {/* Copyright Section */}
      <div>
        <p>Copyright © 2024 LeetCode</p>
      </div>

      {/* Links Section */}
      <div className="flex justify-between">
        <p className="hover:cursor-pointer hover:text-white mx-2">Help Center</p>
        <p className="mx-2">|</p>
        <p className="hover:cursor-pointer hover:text-white mx-2">Terms</p>
        <p className="mx-2">|</p>
        <p className="hover:cursor-pointer hover:text-white mx-2">Privacy Policy</p>
      </div>

      {/* Country Section */}
      <div className="flex w-20 justify-around items-center">
        <img className="h-6 w-6 rounded-[50%]" src={assets.flag} alt="Flag" />
        Bharat
      </div>
    </footer>
  );
};

export default Footer;
