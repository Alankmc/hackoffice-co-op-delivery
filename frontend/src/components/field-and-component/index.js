import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  margin-bottom: 6px;
  flex-direction: column;
`;

const FieldWrapper = styled.div``;

const FieldAndComponent = (props) => {
  const { children, field, ...rest } = props;

  return (
    <FieldWrapper {...rest}>
      <Field>{field}</Field>
      {children}
    </FieldWrapper>
  )
}

export default FieldAndComponent;