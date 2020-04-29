import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px;
  background-color: #f95734;
  border-radius: 20px;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:hover:not(:disabled) {
    background-color: #cf310e;
  }
  &:disabled {
    background-color: #a8a8a8;
    cursor: default;
  }
  transition: all 0.3s;
`;

const Button = (props) => {
  return (<StyledButton {...props} />)
}

export const GhostButton = styled(Button)`
  background-color: transparent;
  color: #f95734;
  padding: 0;
  font-size: 0.9rem;
  &:hover:not(:disabled) {
    background-color: transparent;
    color: #cf310e;
  }
`;

export const GreenButton = styled(Button)`
  background-color: #3f8f50;
  font-size: 1.3rem;
  padding: 10px 15px;

  &:hover:not(:disabled) {
    background-color: #2d7a58;
  }
`;

export default Button;