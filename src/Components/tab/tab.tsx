import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import _ from '../../assets/fx';

const Tab: any = styled(Link)`
  display: grid;
  & i > svg {
    width: 50%;
    height: 50%;
    align-self: center;
    justify-self: center;
    color: ${props => props.theme.primaryColor};
  }

  > i {
    display: grid;
  }

  :focus {
    & i > svg {
      color: ${props => props.theme.ActiveColor};
    }
  }
`;

export default (to?: any, active?: boolean, fn?: any) => {
  function toggleMenu() {}

  <Tab to={to} active={active} onclick={fn} />;

  return <Tab to={to} />;
};
