import { useContext, createContext } from 'react';

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
};

export { authContext, useAuth };
