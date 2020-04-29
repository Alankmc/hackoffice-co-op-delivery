import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FilterTitle = styled.div`
  color: ${({ isSelected }) => (isSelected ? "#f95831" : undefined)};
  padding-right: 4px;
  transition: all 0.3s;
`;
const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: 18px;
  transition: all 0.3s;
  border-radius: 4px;
`;
const TurnIcon = styled.div`
  transform: ${({isUp}) => isUp ? 'rotate(0)' : 'rotate(180deg)'};
  transition: all 0.3s;
  color: ${({ isSelected }) => (isSelected ? "#f95831" : undefined)};
`;
const BeltWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;
const WholeContainer = styled.div`
  border-radius: 4px;
  background-color: #2b193e;
  color: white;
  padding: 8px;
  margin-bottom: 16px;
`;
const FilterIcon = (props) => {
  const { filterClick, children, isSelected, isUp } = props;
  return (
    <ButtonWrapper onClick={filterClick} isSelected={isSelected}>
      <FilterTitle isSelected={isSelected}>{children}</FilterTitle>
      <TurnIcon isUp={isUp && isSelected} isSelected={isSelected}>
        <FontAwesomeIcon icon={faChevronUp} />
      </TurnIcon>
    </ButtonWrapper>
  );
};

const FilterBelt = (props) => {
  const { filterHandle, currFilter } = props;
  console.log(currFilter);
  const changeFilter = (newKey) => {
    if (!currFilter || currFilter.key !== newKey) {
      filterHandle({
        direction: 'up',
        key: newKey,
      })
    } else {
      console.log('FLIP!')
      filterHandle({
        key: newKey,
        direction: currFilter.direction === 'up' ? 'down' : 'up',
      })
    }
  }
  const currKey = currFilter?.key;
  const isUp = currFilter?.direction === 'up';
  return (
    <WholeContainer>
      Ordenar por:
      <BeltWrapper>
        <FilterIcon
          isSelected={currKey === "createdAt"}
          isUp={isUp}
          filterClick={() => changeFilter("createdAt")}
        >
          Data
        </FilterIcon>
        <FilterIcon
          isSelected={currKey === "status"}
          isUp={isUp}
          filterClick={() => changeFilter("status")}
        >
          Status
        </FilterIcon>
        <FilterIcon
          isSelected={currKey === "expiryDate"}
          isUp={isUp}
          filterClick={() => changeFilter("expiryDate")}
        >
          Prazo
        </FilterIcon>
      </BeltWrapper>
    </WholeContainer>
  );
};

export default FilterBelt;
