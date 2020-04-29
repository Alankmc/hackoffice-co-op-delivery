import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { loginContext } from "../../contexts/login";
import SignUpModal from "../../pages/sign-up-modal";

const BarWrapper = styled.div`
  width: 100%;
  background-color: #2b193d;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Linker = styled.div`
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;

const ClickableDiv = styled.div`
  color: white;
  cursor: pointer;
`;

const TopBar = () => {
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);

  return (
    <BarWrapper>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Linker>Home</Linker>
      </NavLink>

      {/* <NavLink to="/sign-up" style={{ textDecoration: 'none' }}>
        <Linker>Cadastre-se</Linker>
      </NavLink> */}
      <loginContext.Consumer>
        {(context) => {
          if (!context.userInfo) {
            return (
              <ClickableDiv onClick={() => setSignUpIsOpen(true)}>
                Login
              </ClickableDiv>
            );
          } else if (signUpIsOpen) {
            setSignUpIsOpen(false);
          }
          return (
            <NavLink to="/my-info" style={{ textDecoration: "none" }}>
              <Linker>Minhas listas</Linker>
            </NavLink>
          );
        }}
      </loginContext.Consumer>

      {signUpIsOpen && (
        <SignUpModal closeHandler={() => setSignUpIsOpen(false)} />
      )}
    </BarWrapper>
  );
};

const ContentWrapper = styled.div`
  margin: 16px;
`;

const PageTemplate = (props) => {
  const { children } = props;

  return (
    <div>
      <TopBar />
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
};

export default PageTemplate;
