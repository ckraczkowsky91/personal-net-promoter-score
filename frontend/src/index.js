import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar
} from '@material-ui/core';
import { ChatBubble as HomeIcon } from '@material-ui/icons';
import path from 'path'

import Form from './Components/Form';
import Admin from './Components/Admin';
import Login from './Components/Login';
import { authContext, useAuth } from './Components/utils';

var url;
if (process.env.NODE_ENV === "production") {
  console.log('peepee');
  url = '/graphql';
} else {
  console.log('poop');
  url = 'http://localhost:4000/graphql';
};

console.log(url)
const apolloClient = new ApolloClient({
  uri: url,
  cache: new InMemoryCache()
});
console.log(apolloClient);

/*
  Components
*/

function App(){
  return(

      <ProvideAuth>
      <BrowserRouter>
      <ApolloProvider client={apolloClient}>
      <AppBar color="transparent" position="sticky" style={{boxShadow: 'none'}}>
      <Toolbar>
        <IconButton edge="start" component={Link} to="/">
            <HomeIcon />
        </IconButton>
        <Button component={Link} to="/admin">
          Admin
        </Button>
        <AuthButton />
      </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="/">
          <Form />
        </Route>
      </Switch>
      </ApolloProvider>
      </BrowserRouter>


      <a
        href="https://github.com/ckraczkowsky91"
        style={{
          bottom: 0,
          color: 'lightgrey',
          fontFamily: "'Alata', sans-serif",
          fontSize: '1.5rem',
          left: '50%',
          opacity: 0.5,
          position: 'fixed',
          textDecoration: 'none',
          transform: 'translate(-50%, 0)'
        }}>© Colin Kraczkowsky</a>
        </ProvideAuth>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 10); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 10);
  }
};

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (authenticate) => {
    return fakeAuth.signin(() => {
      setUser("user");
      authenticate();
    });
  };

  const signout = (authenticate) => {
    return fakeAuth.signout(() => {
      setUser(null);
      authenticate();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <Button
      onClick={() => {
        auth.signout(() => history.push("/"));
      }}
    >
      Sign out
    </Button>
  ) : (
    null
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

ReactDOM.render(
  <App />, document.getElementById('root')
);
