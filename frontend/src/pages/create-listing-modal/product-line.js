import React from "react";
import styled from "styled-components";
import InputField, { GhostField } from "../../components/input-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

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
  transition: all 0.3s;
`;
const RemoveButton = styled.button`
  background-color: #c80639;
  border-radius: 50%;
  border: none;
  padding: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
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

export const ProductInput = (props) => {
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
            style={{marginBottom: '4px'}}
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
        style={{ width: "90%" }}
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
