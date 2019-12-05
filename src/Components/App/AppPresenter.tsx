import PropTypes from 'prop-types';
import React from 'react';
import Router from '../../router';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 14fr;
  height: 100vh;
`;

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <>
    <Grid>
      <Router isLoggedIn={isLoggedIn} />
    </Grid>
  </>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppPresenter;
