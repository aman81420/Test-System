
import React, { useContext, useState } from 'react'
import assets from '../assets/assets'

// import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'



const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)   // token is true if user is logged in

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/Login')
  }
  const login = ()=>{
    navigate('/Login')
  }

  return (
    <nav className="w-full h-[4rem] flex justify-around items-center bg-[#1a1919f0]  text-[#958e8ef9] border-y-[0.1px] border-t-0 border-[#958e8ef9]">
    {/* Icon or Logo */}
    <i className="hover:cursor-pointer hover:text-4.8xl text-[#4a9efe] text-5xl fa-brands fa-pied-piper"></i>
    {/* Uncomment the line below if you prefer an image logo */}
    {/* <img className="h-11 mx-[6rem]" src="../images/logo.jpeg" alt="study-logo" /> */}
    
    {/* Navigation Links */}
    <div className="flex space-x-8">
      <ul className="text-lg hover:cursor-pointer hover:text-white">Explore</ul>
      <ul className="text-lg hover:cursor-pointer hover:text-white">Problems</ul>
      <ul className="text-lg hover:cursor-pointer hover:text-white">Contest</ul>
      <ul className="text-lg hover:cursor-pointer hover:text-white">Discuss</ul>
    </div>
    
    {/* Log Out Button */}
    <div>
 
  {!token && !userData ? (
    <div>
        <button
        onClick={login}
        className="hover:bg-[#8a7b5bd3] font-semibold border-2 p-1 px-4 text-yellow-500 border-none bg-[#513916a8] rounded-md mx-2"
      >
        Login
      </button>
    </div>
  ) : (
    <>
      
      <div className="flex items-center space-x-3">
  <img className="w-10 h-10 rounded-full" src={assets.userImg} alt="User" />
  <button
    onClick={logout}
    className="hover:bg-[#8a7b5bd3] font-semibold  p-1 px-4 text-yellow-500 bg-[#513916a8] rounded-md"
  >
    Log Out
  </button>
</div>

    </>
  )}
</div>

  </nav>
  )
}

export default Navbar
