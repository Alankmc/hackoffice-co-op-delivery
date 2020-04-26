import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldWrapper = styled.div``;

const FieldAndComponent = (props) => {
  const { children, field } = props;

  return (
    <FieldWrapper>
      <Field>{field}</Field>
      {children}
    </FieldWrapper>
  )
}

export default FieldAndComponent;