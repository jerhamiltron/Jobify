import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../context/appContext.js';

import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo.js';
import Wrapper from '../assets/wrappers/Navbar.js';

const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button onClick={() => logoutUser()} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
