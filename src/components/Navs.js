import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', test: 'Home' },
  { to: '/starred', test: 'Starred' },
];

const Navs = () => {
  return (
    <div>
      <ul>
        {LINKS.map(items => (
          <li key={items.to}>
            <Link to={items.to}>{items.test}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
