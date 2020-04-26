import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import { listContext } from "../../contexts/lists";
import Loader from "../../components/loader";
import Listings from "./listings";
import PageTemplate from "../../components/page-template";
import CreateListingModal from "../create-listing-modal";
import ViewListingModal from "../view-listing-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const spreadInputProps = (listing) => ({
  name: listing.nome,
  products: listing.itens,
  expiryDate: listing.validade,
  deliveryAddress: listing.localEntrega,
  buyAddress: listing.localCompra,
  notes: listing.observacoes,
});

const LoaderWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  justify-content: center;
  display: flex;
`;

const MainPage = (props) => {
  const { loading, data, setData } = props;
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [showingList, setShowingList] = useState(-1);

  return (
    <div>
      {createIsOpen && (
        <CreateListingModal
          closeHandler={() => setCreateIsOpen(false)}
          newDataHandler={(newData) => {
            setData([newData, ...data]);
          }}
        />
      )}

      {showingList >= 0 && (
        <ViewListingModal
          closeHandler={() => setShowingList(-1)}
          {...spreadInputProps(data[showingList])}
        />
      )}

      <h1 style={{ display: "flex" }}>
        Listagens
        <Button
          onClick={() => setCreateIsOpen(true)}
          style={{ marginLeft: "24px" }}
        >
          <FontAwesomeIcon icon={faPlus} /> Criar Lista!
        </Button>
      </h1>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <Listings listings={data} selectListHandler={setShowingList} />
      )}
    </div>
  );
};

const ThinPageWrapper = styled.div`
  width: 85%;
  margin: auto;
`;

function MainPageConnector() {
  return (
    <PageTemplate>
      <ThinPageWrapper>
        <listContext.Consumer>
          {(listContext) => <MainPage {...listContext} />}
        </listContext.Consumer>
      </ThinPageWrapper>
    </PageTemplate>
  );
}

export default MainPageConnector;
