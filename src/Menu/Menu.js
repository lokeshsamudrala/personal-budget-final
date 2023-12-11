import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ authenticated, onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions, e.g., clearing user session
    onLogout();

    // Redirect to the home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="menu" aria-label="Main Menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        {!authenticated && <li><Link to="/signup">Sign Up</Link></li>}
        {!authenticated && <li><Link to="/login">Login</Link></li>}
        {authenticated && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/configure">Configure</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;

