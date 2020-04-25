import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 6px;
  outline: none;
`;

const Button = (props) => {
  return (<StyledButton {...props} />)
}

export default Button;