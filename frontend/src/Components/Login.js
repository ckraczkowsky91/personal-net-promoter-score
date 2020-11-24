import React, { useState } from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import {
  Container,
  TextField
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

import { LoginButton, TitleText } from './StyledComponents';
import { useAuth } from './utils';

/*
  GraphQL
*/
const AUTHENTICATE_USER = gql`
  mutation authenticateUser($username: String!, $password: String!){
    authenticateUser(username: $username, password: $password)
  }
`;

/*
  Component
*/
export default function Login() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const [usernameString, setUsernameString] = useState(null);
  const [passwordString, setPasswordString] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [authenticateUser, {data}] = useMutation(AUTHENTICATE_USER);

  let { from } = location.state || { from: { pathname: "/" } };

  const login = (event) => {
    authenticateUser({variables: {username: usernameString, password: passwordString}})
      .then((response) => {
        if(response.data.authenticateUser){
          auth.signin(() => {
            history.replace(from);
          });
        } else {
          setInputError(true);
        };
      })
      .catch((error) => {
        setInputError(true);
      })
  };

  const handleTextChange = (event) => {
    switch(event.target.id){
      case "usernameField":
        setUsernameString(event.target.value);
        break;
      case "passwordField":
        setPasswordString(event.target.value);
        break;
      default:
        console.log('ERROR: No input given!');
    };
  };

  return (
    <Container style={{width:'30rem'}}>
      <TitleText>Please log in to continue:</TitleText>
      <form>
        <TextField
          id="usernameField"
          error={inputError}
          fullWidth={true}
          label="Username"
          onChange={handleTextChange}
          style={{marginTop:'1.5rem'}}
          variant="outlined"/>
        <br/>
        <TextField
          id="passwordField"
          error={inputError}
          fullWidth={true}
          label="Password"
          onChange={handleTextChange}
          style={{marginTop:'1.5rem'}}
          variant="outlined"/>
      </form>
      <LoginButton
        onClick={login}
        variant='outlined'>Log in</LoginButton>
    </Container>
  );
};
