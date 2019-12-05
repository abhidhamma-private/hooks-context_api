import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import _ from '../../assets/fx';
import Tab from '../tab/tab';

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  & > a:focus {
    border-bottom: 4px solid ${props => props.theme.ActiveColor};
    border-radius: 5px;
  }
`;

// const Tab: any = styled(Link)`
//   display: grid;
//   & i > svg {
//     width: 50%;
//     height: 50%;
//     align-self: center;
//     justify-self: center;
//     color: ${props => props.theme.primaryColor};
//   }

//   > i {
//     display: grid;
//   }

//   :focus {
//     & i > svg {
//       color: ${props => props.theme.ActiveColor};
//     }
//   }
// `;
export default (): any => {
  const toggleMenu = () => {
    //1. 탭에 불린값 active를준다.
    //2.탭에 온클릭을 달아준다
    //컴포넌트로 만들어줌
    //3.클릭이 발생한곳에 불린1을주고 나머지는 없앤다.
  };
  <Tab></Tab>;
  return (
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
};
