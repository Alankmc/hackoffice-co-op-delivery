import React from "react";
import styled from "styled-components";

const Field = styled.input`
  padding: 12px 8px 10px 10px;
  border-radius: 4px;
  border: 1px solid ${({ error }) => (error ? "#d61a1a" : "#571845")};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 0.9rem;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 0.3s;
`;

const TextAreaField = Field.withComponent("textarea");

const InputField = (props) => {
  if (props.type === "textarea") {
    return <TextAreaField {...props} />;
  }
  return <Field {...props} />;
};

export const GhostField = styled.input`
  border: none;
  background-color: transparent;
  padding: 0 10px 0 10px;
  font-size: 1.5rem;
  color: grey;
  border-bottom: 2px solid grey;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default InputField;
