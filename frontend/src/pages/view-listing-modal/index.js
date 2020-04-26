import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import InputField from "../../components/input-field";
import Button, { GreenButton } from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMapMarkerAlt,
  faStore,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { BASE_URL } from "../../config/env";
import Loader from "../../components/loader";

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PortalPositioner = styled.div`
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  transition: all 0.3s;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
`;
const FormPositioner = styled.div`
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  border-radius: 5px;
  width: 650px;
  position: relative;
`;
const Wrapper = styled.div`
  padding: 22px;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const TitularSpan = styled.span`
  color: #f95734;
  font-weight: bold;
`;

const AdditionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const AdditionalInfo = styled.div`
  margin-right: 24px;
`;

const ProductListWrapper = styled.div`
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ProductWrapper = styled.div`
  margin: 6px 0;
`;

const GoButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Product = (props) => {
  const { product } = props;

  return <ProductWrapper>• {product}</ProductWrapper>;
};

const ViewListing = (props) => {
  const { closeHandler, name, products, deliveryAddress, buyAddress } = props;
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => setHide(false), []);

  const triggerClose = () => {
    setHide(true);
    setTimeout(() => closeHandler(), 310);
  };

  const clickedGo = () => {
    console.log('Uhhhh clicked go?')
    if (confirm) {
    } else {
      setConfirm(true);
    }
  };

  return (
    <PortalPositioner hide={hide}>
      <Overlay />
      <FormPositioner>
        {loading && (
          <LoaderOverlay>
            <Loader />
          </LoaderOverlay>
        )}

        <CloseIcon onClick={triggerClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>

        <Wrapper>
          <h1 style={{ margin: "0 0 18px 0" }}>Lista para {name}</h1>
          <AdditionalInfoWrapper>
            <AdditionalInfo>
              <FontAwesomeIcon icon={faShoppingBasket} color="#f95734" />{" "}
              <TitularSpan>Produtos:</TitularSpan> {products.length}
            </AdditionalInfo>
            <AdditionalInfo>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#f95734" />{" "}
              <TitularSpan>Entrega para:</TitularSpan> {deliveryAddress}
            </AdditionalInfo>
            {!!buyAddress && (
              <AdditionalInfo>
                <FontAwesomeIcon icon={faStore} color="#f95734" />{" "}
                <TitularSpan>Local de Compra:</TitularSpan> {buyAddress}
              </AdditionalInfo>
            )}
          </AdditionalInfoWrapper>
          <ProductListWrapper>
            {products.map((el, index) => (
              <Product product={el} key={`product_${index}`} />
            ))}
          </ProductListWrapper>
          <GoButtonWrapper>
            <GreenButton type="button" onClick={clickedGo}>
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              {confirm ? "Confirma?" : "Bora lá!"}
            </GreenButton>
          </GoButtonWrapper>
        </Wrapper>
      </FormPositioner>
    </PortalPositioner>
  );
};

const Portalized = (props) => {
  return ReactDOM.createPortal(
    <ViewListing {...props} />,
    document.getElementById("root")
  );
};

export default Portalized;
