import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const UserInfo = styled.div``;

const ProductWrapper = styled.div`
  padding: 8px;
`;

const Product = (props) => {
  const { product } = props;
  return (
    <ProductWrapper>
      {product}
    </ProductWrapper>
  );
};

const Listing = (props) => {
  const { nome, itens, validade, location } = props;
  return (
    <Wrapper>
      <UserInfo>
        {nome} precisa de
        {itens.length > 1
          ? ` ${itens.length} produtos`
          : ` ${itens.length} produto`}
        :
      </UserInfo>
      {itens.map((el, index) => (
        <Product key={`${nome}_${index}`} product={el} />
      ))}
    </Wrapper>
  );
};

export default Listing;