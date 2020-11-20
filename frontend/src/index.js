import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { withStyles } from '@material-ui/styles';

import Form from './Components/Form';
import Admin from './Components/Admin';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
});

function App(){
  return(
    <ApolloProvider client={apolloClient}>
      <Form />
      <a
        href="https://github.com/ckraczkowsky91"
        style={{
          bottom: 0,
          color: 'lightgrey',
          fontFamily: "'Alata', sans-serif",
          fontSize: '1.5rem',
          left: '50%',
          marginBottom: '8px',
          opacity: 0.5,
          position: 'fixed',
          textDecoration: 'none',
          transform: 'translate(-50%, 0)'
        }}>© Colin Kraczkowsky</a>
        <Admin />
    </ApolloProvider>
  );
};

ReactDOM.render(
  <App />, document.getElementById('root')
);
