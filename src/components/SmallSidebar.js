import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';

import NavLinks from './NavLinks.js';
import links from '../utils/links.js';
import Logo from './Logo.js';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
