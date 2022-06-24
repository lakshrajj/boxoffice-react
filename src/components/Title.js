import React from 'react';
import { TitleWrapperr } from './Title.styled';

const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapperr>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapperr>
  );
};

export default Title;
