// Navbar.js or Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'; // Ensure this is the correct path

const Navbar: React.FC = () => {
  return (
    <div className="nav-container">
      <div className="nav-sub-container">
        <Link className="nav-item" to="/home">Home</Link>
        {/* <Link className="nav-item" to="/browse">Browse</Link> */}
      </div>
      <div className="nav-sub-container">
        <Link className="nav-item" to="/browse">Browse</Link>
      </div>  
      <div className="nav-sub-container">
        {/* <img className="nav-user-img" src="../assets/user.png" alt="User" /> */}
        {/* <div className="nav-logout">Logout</div> */}
        <Link className="nav-logout" to="/login">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;

