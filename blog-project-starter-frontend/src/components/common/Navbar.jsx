import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    navigate("/login"); // Redirect to login
    window.location.reload(); // Refresh to update navbar state
  };

  return (
    <div className='py-5 flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Personal</h2>
      <div className='flex items-center'>
        {/* These links only work if the user is logged in due to App.js protection */}
        <Link className='list-none px-5 hover:text-orange-400' to="/home">Home</Link>
        <Link className='list-none px-5 hover:text-orange-400' to="/blogs">Blogs</Link>
        <Link className='list-none px-5 hover:text-orange-400' to="/about">About</Link>

        {/* Conditional Rendering: Show Logout if token exists, otherwise show Login */}
        {token ? (
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600'
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className='button-style hidden md:block'
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar