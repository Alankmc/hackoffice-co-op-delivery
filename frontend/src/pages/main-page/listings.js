import React, { useState } from "react";
import styled from "styled-components";
import Listing from "../../components/listing";
import FilterBelt from "../../components/sort-belt";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const STATUS = {
  NEW: 10,
  ASSIGNED: 2,
  DELIVERED: 1,
  CANCELLED: 0,
};

const orders = {
  up: {
    createdAt: (a, b) => a.createdAt - b.createdAt,
    expiryDate: (a, b) => a.expiryDate - b.expiryDate,
    status: (a, b) => STATUS[a.status] - STATUS[b.status],
  },
  down: {
    createdAt: (a, b) => b.createdAt - a.createdAt,
    expiryDate: (a, b) => b.expiryDate - a.expiryDate,
    status: (a, b) => STATUS[b.status] - STATUS[a.status],
  },
};

const Listings = (props) => {
  const { listings, selectListHandler } = props;
  const [currFilter, setCurrFilter] = useState(null);

  if (!listings || !listings.length) {
    return <div>Nenhuma lista de compras no momento!</div>;
  }

  const filteredData = currFilter
    ? listings.sort(orders[currFilter.direction][currFilter.key])
    : listings;

  return (
    <div>
      <FilterBelt filterHandle={setCurrFilter} currFilter={currFilter} />
      <Wrapper>
        {filteredData.map((el, index) => (
          <Listing
            key={`listing_${el.id}`}
            selectListHandler={() => selectListHandler(index)}
            {...el}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Listings;
