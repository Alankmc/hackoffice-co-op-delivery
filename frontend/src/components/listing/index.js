import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMapMarkerAlt,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.07);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.14);
  }
  transition: all 0.3s;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 1.5rem;
  color: #900c3e;
`;

const AdditionalInfo = styled.div`
  margin-left: 16px;
`;

const Listing = (props) => {
  const { creator, products, expiryDate, deliveryAddress, buyAddress, selectListHandler } = props;
  return (
    <Wrapper onClick={selectListHandler}>
      <UserInfo>
        <UserName>{creator.name}</UserName>
        <AdditionalInfo>
          <FontAwesomeIcon icon={faShoppingBasket} color="#f95734" />{" "}
          {products.length}
        </AdditionalInfo>
        <AdditionalInfo>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#f95734" />{" "}
          {deliveryAddress}
        </AdditionalInfo>
        {!!buyAddress && (
          <AdditionalInfo>
            <FontAwesomeIcon icon={faStore} color="#f95734" /> {buyAddress}
          </AdditionalInfo>
        )}
      </UserInfo>
    </Wrapper>
  );
};

export default Listing;
