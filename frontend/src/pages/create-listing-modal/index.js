import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import InputField from "../../components/input-field";
import Button, { GreenButton } from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { BASE_URL } from "../../config/env";
import FieldAndComponent from "../../components/field-and-component";
import { ProductInput } from "./product-line";
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
const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const FieldGrouper = styled.div`
  margin-top: 8px;
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  justify-content: space-between;
`;

const JustFormWrapper = styled.div`
  width: 90%;
  margin: auto;
`;

const TextInputWrappers = styled.div`
  display: flex;
  align-items: center;
  /* width: 85%; */
  margin: auto;
  flex-direction: column;
`;

const ouputValues = ({
  products,
  notes,
  expirationDate,
  name,
  deliveryAddress,
  userInfo,
}) => {
  const date = new Date(expirationDate);
  return {
    creatorId: userInfo.id,
    expiryDate: date.getTime(),
    deliveryAddress,
    products: products.map((el) => `${el.quantity} ${el.product}`),
    notes,
  };
};

const CreateListing = (props) => {
  const { closeHandler, newDataHandler, userInfo } = props;
  const [products, setProducts] = useState([{ quantity: 1, product: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [hide, setHide] = useState(true);

  const changeProduct = (values, index) => {
    setProducts(products.map((el, ind) => (ind === index ? values : el)));
  };

  useEffect(() => setHide(false), []);

  const triggerClose = () => {
    setHide(true);
    setTimeout(() => closeHandler(), 310);
  };

  const submitList = async () => {
    setLoading(true);
    try {
      const response = await Axios.post(
        `${BASE_URL}/compras`,
        ouputValues({ products, notes, deliveryAddress, expirationDate, userInfo })
      );
      setLoading(false);
      newDataHandler(response.data);
      triggerClose();
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const goodToSubmit =
    products.reduce((acc, curr) => {
      if (!curr.quantity || !curr.product) {
        return false;
      }
      return acc;
    }, true) &&
    !loading &&
    !!expirationDate &&
    !!deliveryAddress;

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
          <h1 style={{ margin: "0 0 18px 0" }}>Criar Lista de Compras</h1>
          <JustFormWrapper>
            <ProductWrapper>
              {products.map((el, index) => (
                <ProductInput
                  onlyOne={products.length === 1}
                  key={`product_input_${index}`}
                  quantity={el.quantity}
                  product={el.product}
                  onChange={(v) => changeProduct(v, index)}
                  onRemove={() => {
                    setProducts(
                      products.filter((_, pIndex) => pIndex !== index)
                    );
                  }}
                />
              ))}
            </ProductWrapper>
            <Button
              onClick={() =>
                setProducts([...products, { quantity: 1, product: "" }])
              }
              style={{margin: '4px 0 10px 0'}}
            >
              Adicionar Produto
            </Button>
            <TextInputWrappers>
              <FieldGrouper>
                <FieldAndComponent field="Endereço">
                  <InputField
                    type="text"
                    disabled={loading}
                    value={deliveryAddress}
                    placeholder="Rua coisa e tal"
                    onChange={({ target: { value } }) =>
                      setDeliveryAddress(value)
                    }
                    style={{marginRight: '16px'}}
                  />
                </FieldAndComponent>
                <FieldAndComponent field="Data de Validade">
                  <InputField
                    type="text"
                    disabled={loading}
                    value={expirationDate}
                    placeholder="Data de Validade"
                    onChange={({ target: { value } }) => setExpirationDate(value)}
                  />
                </FieldAndComponent>
              </FieldGrouper>
              <FieldAndComponent field="Observações" style={{width: '100%'}}>
                <InputField
                  type="textarea"
                  disabled={loading}
                  value={notes}
                  onChange={({ target: { value } }) => setNotes(value)}
                  style={{marginBottom: '10px', width: '100%'}}
                />
              </FieldAndComponent>
            </TextInputWrappers>
            <div style={{display: 'flex', justifyContent: 'flex-end', widht: '100%'}}>
              <GreenButton disabled={!goodToSubmit} onClick={submitList}>
                Enviar
              </GreenButton>
            </div>
          </JustFormWrapper>
        </Wrapper>
      </FormPositioner>
    </PortalPositioner>
  );
};

const Portalized = (props) => {
  return ReactDOM.createPortal(
    <CreateListing {...props} />,
    document.getElementById("root")
  );
};

export default Portalized;
