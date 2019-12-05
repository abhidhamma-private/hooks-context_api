import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  & > a:focus {
    border-bottom: 4px solid ${props => props.theme.ActiveColor};
    border-radius: 5px;
  }
`;

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

export default (): any => (
  <Menu>
    <Tab to="/people">
      <Icon type="team" />
    </Tab>

    <Tab to="/diary">
      <Icon
        type="read"
        style={{ fontSize: '16px', color: '#08c' }}
        theme="outlined"
      />
    </Tab>
    <Tab to="/alarm">
      <Icon type="sound" />
    </Tab>
    <Tab to="/board">
      <Icon type="message" />
    </Tab>
    <Tab to="/me">
      <Icon type="user" />
    </Tab>
    <Tab to="/etc">
      <Icon type="menu" />
    </Tab>
  </Menu>
);
