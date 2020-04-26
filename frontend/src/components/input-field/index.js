import React from 'react';
import styled from "styled-components";

const Field = styled.input`
  padding: 6px;
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
`;

export default InputField;