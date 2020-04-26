import React from "react";
import styled from "styled-components";
import Listing from "../../components/listing";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Listings = (props) => {
  const { listings, selectListHandler } = props;

  if (!listings || !listings.length) {
    return (<div>No listings!</div>)
  }

  return (
    <Wrapper>
      {listings.map((el, index) => (
        <Listing key={`listing_${el.id}`} selectListHandler={() => selectListHandler(index)} {...el} />
      ))}
    </Wrapper>
  );
};

export default Listings;
