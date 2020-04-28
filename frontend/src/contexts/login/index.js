import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { BASE_URL } from "../../config/env";

export const loginContext = React.createContext({
  token: null,
  userInfo: null,
  loginHandler: null,
  loginLoading: false,
  loginError: null,
});

const LoginProvider = ({ children }) => {
  const [state, setState] = useState({
    token: null,
    userInfo: null,
    loginHandler: null,
    loginLoading: true,
    loginError: null,
  });

  const login = async () => {
    setState({ ...state, loginLoading: true });
    try {
    } catch (e) {
      
    }
    setState({ ...state, loginLoading: false });
  };

  // useEffect(() => {
  //   login();
  // }, [login]);

  return (
    <loginContext.Provider
      value={{
        ...state,
        loginHandler: login,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
