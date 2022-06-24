import React from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line
import { NavList, LinkStyled } from './Navs.styled';

const LINKS = [
  { to: '/', test: 'Home' },
  { to: '/starred', test: 'Starred' },
];

const Navs = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map(items => (
          <li key={items.to}>
            <LinkStyled
              to={items.to}
              className={items.to === location.pathname ? 'active' : ''}
            >
              {items.test}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
