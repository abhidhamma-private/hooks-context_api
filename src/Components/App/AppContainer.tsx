import React from 'react';
import { ThemeProvider, createGlobalStyle } from '../../typed-components';
import { graphql } from 'react-apollo';
import { IS_LOGGED_IN } from './AppQueries';
import AppPresenter from './AppPresenter';
import theme from '../../theme';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    font-family:'NanumB';
  }
  
`;

const AppContainer = ({ data }: any) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
