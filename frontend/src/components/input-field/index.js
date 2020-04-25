import React from 'react';
import styled from "styled-components";

const Field = styled.input`
  padding: 6px;
`;

const InputField = (props) => {
  return (
    <Field {...props} />
  )
}

export default InputField;