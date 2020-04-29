import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GreenButton } from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faMapMarkerAlt,
  faStore,
  faTimes,
  faShoppingCart,
  faRunning,
  faCalendarAlt,
  faHourglassEnd,
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
  margin-bottom: 6px;
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

const ThisGreenButton = styled(GreenButton)`
  width: 220px;
`;

const Product = (props) => {
  const { product } = props;

  return <ProductWrapper>• {product}</ProductWrapper>;
};

const RedButton = styled(GreenButton)`
  background-color: #c80639;
  margin-right: 16px;

  &:hover:not(:disabled) {
    background-color: #c80639;
  }
`;

const BlueButton = styled(GreenButton)`
  background-color: #20639c;

  &:hover:not(:disabled) {
    background-color: #20639c;
  }
`;

const ViewListing = (props) => {
  const {
    closeHandler,
    name,
    products,
    deliveryAddress,
    buyAddress,
    id,
    userInfo,
    assignee,
    creator,
    assignHandler,
    updateStatusHandler,
    status,
    expiryDate,
    createdAt,
  } = props;
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [deliverConfirm, setDeliverConfirm] = useState(false);

  const isMine = userInfo && creator.id === userInfo.id;

  useEffect(() => setHide(false), []);

  const triggerClose = () => {
    setHide(true);
    setTimeout(() => closeHandler(), 310);
  };

  const clickedAction = async (isCancel = false) => {
    console.log("Clicked with cancel", isCancel, confirm, isMine);
    if (isMine && !deliverConfirm && !isCancel) {
      setConfirm(false);
      setDeliverConfirm(true);
      return;
    }
    if (isMine && isCancel && !confirm) {
      setConfirm(true);
      setDeliverConfirm(false);
      return;
    }
    if (confirm || deliverConfirm) {
      setLoading(true);
      if (isMine) {
        if (isCancel) {
          await Axios.put(`${BASE_URL}/compras/${id}/cancelar`);
          updateStatusHandler(id, "CANCELLED");
        } else {
          await Axios.put(`${BASE_URL}/compras/${id}/entregar`);
          updateStatusHandler(id, "DELIVERED");
        }
        triggerClose();
      } else {
        await Axios.put(`${BASE_URL}/compras/${id}/atribuir`, {
          assigneeId: userInfo.id,
        });
        assignHandler(id, userInfo);
        triggerClose();
      }
      setLoading(false);
    } else {
      setConfirm(true);
    }
  };

  const renderAssignPortion = () => {
    if (status === "CANCELLED" || status === "DELIVERED") {
      return null;
    }
    if (isMine) {
      return (
        <>
          <RedButton type="button" onClick={() => clickedAction(true)}>
            {confirm ? "Tem certeza?" : "Cancelar"}
          </RedButton>
          <ThisGreenButton type="button" onClick={() => clickedAction(false)}>
            {deliverConfirm ? "Tem certeza?" : "Confirmar Entrega"}
          </ThisGreenButton>
        </>
      );
    }
    if (!!userInfo && creator.id !== userInfo.id && !assignee) {
      return (
        <BlueButton type="button" onClick={clickedAction}>
          <FontAwesomeIcon icon={faShoppingCart} />{" "}
          {confirm ? "Confirma?" : "Bora lá!"}
        </BlueButton>
      );
    }
    return null;
  };
  const createdDate = new Date(createdAt);
  const today = new Date();

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
          <h1 style={{ margin: "0 0 18px 0" }}>Lista para {creator.name}</h1>
          <AdditionalInfoWrapper>
            <AdditionalInfo style={{marginBottom: '12px'}}>
              <TitularSpan>Status:</TitularSpan>{" "}
              <span
                style={{ color: STATUS_COLORS[status], fontWeight: "bold" }}
              >
                {STATUS[status]}
              </span>
            </AdditionalInfo>
            <AdditionalInfo>
              <FontAwesomeIcon icon={faCalendarAlt} color="#f95734" />{" "}
              <TitularSpan>Criado em:</TitularSpan> {createdDate.getDate()}/
              {createdDate.getMonth() + 1}
            </AdditionalInfo>
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
            {!!expiryDate && (
              <AdditionalInfo>
                <FontAwesomeIcon icon={faHourglassEnd} color="#f95734" />{" "}
                <TitularSpan>Prazo:</TitularSpan> {Math.ceil((expiryDate - today) / (1000 * 3600 * 24))} dias
              </AdditionalInfo>
            )}
            {!!assignee && (
              <AdditionalInfo>
                <FontAwesomeIcon icon={faRunning} color="#f95734" />{" "}
                <TitularSpan>
                  Atribuído a{" "}
                  <span style={{ color: "#f95734", fontWeight: "bold" }}>
                    {assignee.name}
                  </span>
                </TitularSpan>
              </AdditionalInfo>
            )}
          </AdditionalInfoWrapper>
          <ProductListWrapper>
            {products.map((el, index) => (
              <Product product={el} key={`product_${index}`} />
            ))}
          </ProductListWrapper>
          <GoButtonWrapper>{renderAssignPortion()}</GoButtonWrapper>
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
