import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const UserInfo = styled.div``;

const ProductWrapper = styled.div`
  padding: 8px;
`;

const Product = (props) => {
  const { quantidade, produto } = props;

  return (
    <ProductWrapper>
      {quantidade} {produto}
    </ProductWrapper>
  );
};

const Listing = (props) => {
  const { nome, itens, date, location } = props;
  return (
    <Wrapper>
      <UserInfo>
        {user} precisa de 
        {itens.length > 1
          ? `${itens.length} produtos`
          : `${itens.length} produto`}
        :
      </UserInfo>
      {itens.map((el, index) => (
        <Product key={`${nome}_${index}`} />
      ))}
    </Wrapper>
  );
};

export default Listing;