import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'


import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem('token');
  }

  return (
    <div>
      <nav>
        <ul>
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
