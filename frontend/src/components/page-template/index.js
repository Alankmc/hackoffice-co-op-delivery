import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
`;

const TopBar = () => {
  return (
    <BarWrapper>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Linker>Home</Linker>
      </NavLink>

      <NavLink to="/sign-up" style={{ textDecoration: 'none' }}>
        <Linker>Cadastre-se</Linker>
      </NavLink>
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
