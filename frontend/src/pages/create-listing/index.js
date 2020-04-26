import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import InputField, { GhostField } from "../../components/input-field";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const PortalPositioner = styled.div`
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.25);
`;
const FormPositioner = styled.div`
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  border-radius: 5px;
  width: 500px;
  position: relative;
`;
const Wrapper = styled.div`
  padding: 22px;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
const QuantityButton = styled.button`
  background-color: #2b193d;
  border-radius: 50%;
  border: none;

  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const RemoveButton = styled.button`
  background-color: #c80639;
  border-radius: 50%;
  border: none;
  padding: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  margin-left: 10px;
`;

const ProductLineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const QuantityButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;

const ProductInput = (props) => {
  const { onlyOne, onRemove, onChange, quantity, product } = props;

  const changeNumber = (str) => {
    if (!str) {
      onChange({
        product,
        quantity: "",
      });
      return;
    }
    const num = parseInt(str);
    if (num <= 0) {
      onChange({
        product,
        quantity: 1,
      });
      return;
    }
    onChange({
      product,
      quantity: num,
    });
  };

  return (
    <ProductLineWrapper>
      <Quantity>
        <QuantityButtons>
          <QuantityButton
            type="button"
            onClick={() => onChange({ quantity: quantity + 1, product })}
          >
            +
          </QuantityButton>
          <QuantityButton
            type="button"
            onClick={() => onChange({ quantity: quantity - 1, product })}
            disabled={quantity <= 1}
          >
            -
          </QuantityButton>
        </QuantityButtons>
        <GhostField
          type="text"
          style={{ width: "5ch" }}
          value={quantity}
          onChange={({ target: { value } }) =>
            changeNumber(value.replace(/[^0-9]/g, ""))
          }
        />
      </Quantity>
      <InputField
        type="text"
        placeholder="Produto"
        value={product}
        onChange={({ target: { value } }) =>
          onChange({ product: value, quantity })
        }
      />
      {onlyOne || (
        <RemoveButton onClick={onRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </RemoveButton>
      )}
    </ProductLineWrapper>
  );
};

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

const CreateListing = (props) => {
  const { closeHandler } = props;
  const [products, setProducts] = useState([{ quantity: 1, product: "" }]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const changeProduct = (values, index) => {
    setProducts(products.map((el, ind) => (ind === index ? values : el)));
  };

  const goodToSubmit = products.reduce((acc, curr) => {
    if (!curr.quantity || !curr.product) {
      return false;
    }
    return acc;
  }, true);

  return (
    <PortalPositioner>
      <Overlay />
      <FormPositioner>
        <CloseIcon onClick={closeHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseIcon>
        <Wrapper>
          <h1 style={{ margin: "0 0 18px 0" }}>Criar Lista de Compras</h1>
          <ProductWrapper>
            {products.map((el, index) => (
              <ProductInput
                onlyOne={products.length === 1}
                key={`product_input_${index}`}
                quantity={el.quantity}
                product={el.product}
                onChange={v => changeProduct(v, index)}
                onRemove={() => {
                  setProducts(products.filter((_, pIndex) => pIndex !== index));
                }}
              />
            ))}
          </ProductWrapper>
          <Button onClick={() => setProducts([...products, { quantity: 1, product: "" }])}>
            Adicionar Produto
          </Button>
          <div>Observacoes</div>
          <InputField
            type="textarea"
            value={notes}
            onChange={({ target: { value } }) => setNotes(value)}
          />
          <Button disabled={!goodToSubmit}>Submeter</Button>
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
