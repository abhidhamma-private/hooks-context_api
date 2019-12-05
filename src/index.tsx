import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import App from './Components/App';
import './assets/font/NanumGothicCoding-Regular.ttf';
import './assets/font/NanumGothicCoding-Bold.ttf';
import './assets/font/font.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
