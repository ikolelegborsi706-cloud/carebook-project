import { MdOutlineMenu } from "react-icons/md";
import React, { use } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { FaPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

function Header() {
  const [show, setShow] = useState(false);
  return (
    <header>
        <div className='logo'>
          <FaPlusSquare />
         <Link to={"/"} className='logo-brand'>CareBook</Link>
         <button type="button" className="menu-toggle" onClick={() => setShow(!show)}>
          <span className={`menu-icon`}>
            {show ? <IoClose/> : <MdOutlineMenu />}
          </span>
         </button> 
        </div>
        <nav className={`nav-links ${show ? 'open' : ''}`}>
        <Navbar />
        </nav>
        
    </header>
  )
}

export default Header