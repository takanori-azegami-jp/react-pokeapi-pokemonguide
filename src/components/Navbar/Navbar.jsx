import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div>ポケモンずかん</div>
        <div>
          <small>
            Powered by{' '}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              pokeAPI
            </a>
          </small>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
