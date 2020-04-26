import React from 'react';
import styled from "styled-components";

const Field = styled.input`
  padding: 8px 0 8px 6px;
  border-radius: 3px;
  border: 1px solid #cdcdcd;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const TextAreaField = Field.withComponent('textarea');

const InputField = (props) => {
  if (props.type === 'textarea') {
    return <TextAreaField {...props} />
  }
  return (
    <Field {...props} />
  )
}

export const GhostField = styled.input`
  border: none;
  background-color: transparent;
  padding: 0 10px 0 10px;
  font-size: 1.5rem;
  color: grey;
  border-bottom: 2px solid grey;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default InputField;