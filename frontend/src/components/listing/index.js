import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMapMarkerAlt,
  faStore,
  faCalendarAlt,
  faHourglassEnd,
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
  opacity: ${({ status }) => (status === "CANCELLED" || status === 'DELIVERED' ? 0.45 : 1)};
  transition: all 0.3s;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const BigInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const STATUS_COLORS = {
  ASSIGNED: "#20639c",
  NEW: "#f95734",
  CANCELLED: "#575757",
  DELIVERED: "#3f8f50",
};
const STATUS = {
  ASSIGNED: "Atribuído",
  NEW: "Novo",
  CANCELLED: "Cancelado",
  DELIVERED: "Entregue",
};

const StatusWrapper = styled.div`
  display: flex;
  font-weight: bold;
  color: ${({ status }) => STATUS_COLORS[status]};
  align-items: center;
  margin-right: 16px;
`;

const UserName = styled.span`
  font-size: 1.5rem;
  color: #900c3e;
`;

const AdditionalInfo = styled.div`
  margin-left: 16px;
`;

const Listing = (props) => {
  const {
    creator,
    products,
    expiryDate,
    createdAt,
    deliveryAddress,
    buyAddress,
    status,
    selectListHandler,
  } = props;
  const today = new Date();
  const createdDate = new Date(createdAt);
  return (
    <Wrapper onClick={selectListHandler} status={status}>
      <BigInfoWrapper>
        <UserInfo>
          <UserName>{creator.name}</UserName>
          <AdditionalInfo>
            <FontAwesomeIcon icon={faCalendarAlt} color="#f95734" />{" "}
            {createdDate.getDate()}/{createdDate.getMonth() + 1}
          </AdditionalInfo>
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

          {!!expiryDate && (
            <AdditionalInfo>
              <FontAwesomeIcon icon={faHourglassEnd} color="#f95734" />{" "}
              {Math.ceil((expiryDate - today) / (1000 * 3600 * 24))} dias
            </AdditionalInfo>
          )}
        </UserInfo>
        <StatusWrapper status={status}>{STATUS[status]}</StatusWrapper>
      </BigInfoWrapper>
    </Wrapper>
  );
};

export default Listing;
