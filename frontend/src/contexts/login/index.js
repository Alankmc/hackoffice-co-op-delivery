import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { BASE_URL } from "../../config/env";
import crypto from "crypto";

export const loginContext = React.createContext({
  token: null,
  userInfo: null,
  registerHandler: null,
  loginHandler: null,
  loginLoading: false,
  loginError: null,
});

const LoginProvider = ({ children }) => {
  const [state, setState] = useState({
    token: null,
    userInfo: null,
    registerHandler: null,
    loginHandler: null,
    loginLoading: true,
    loginError: null,
  });

  const login = async ({ email, password }) => {
    setState({ ...state, loginLoading: true });
    try {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const based = btoa(`${email}:${hashedPassword}`);
      const user = await Axios.get(`${BASE_URL}/users/login`, {
        headers: {
          authorization: `Bearer ${based}`,
        },
      });
      console.log('Got user!');
      setState({
        ...state,
        loginLoading: false,
        token: based,
        userInfo: user.data,
      });
    } catch (e) {
      setState({ ...state, loginLoading: false });
    }
  };

  const createUser = async ({ name, email, password }) => {
    setState({ ...state, loginLoading: true });
    try {
      const createdUser = await Axios.post(`${BASE_URL}/users`, {
        name,
        email,
        password,
      });

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const based = btoa(`${email}:${hashedPassword}`);

      setState({
        ...state,
        loginLoading: false,
        token: based,
        userInfo: {
          name,
          email,
          id: createdUser.data.id,
        },
      });
    } catch (e) {
      setState({ ...state, loginLoading: false });
    }
  };

  // useEffect(() => {
  //   login();
  // }, [login]);

  return (
    <loginContext.Provider
      value={{
        ...state,
        loginHandler: login,
        registerHandler: createUser,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
