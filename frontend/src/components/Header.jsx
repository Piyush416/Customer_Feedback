import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('enrollment')
    navigate('/')
  }

  return (
    <div>
      <nav>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : ""}> Home </NavLink>
          </li>
          {!token ? (<> <li>
            <NavLink to='/login' className={({ isActive }) => isActive ? "active-link" : ""}> Login </NavLink>
          </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
            </li>
          </>) : (<li>
            <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
          </li>)
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header
