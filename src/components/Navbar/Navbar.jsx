import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <nav>
        ポケモンずかん{'　'}
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
      </nav>
    </div>
  );
};

export default Navbar;
