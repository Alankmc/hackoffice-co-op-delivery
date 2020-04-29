import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import { listContext } from "../../contexts/lists";
import { loginContext } from "../../contexts/login";
import Loader from "../../components/loader";
import Listings from "./listings";
import PageTemplate from "../../components/page-template";
import CreateListingModal from "../create-listing-modal";
import SignUpModal from "../sign-up-modal";
import ViewListingModal from "../view-listing-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const spreadInputProps = (listing) => ({
  name: listing.name,
  products: listing.products,
  expiryDate: listing.expiryDate,
  deliveryAddress: listing.deliveryAddress,
  buyAddress: listing.buyAddress,
  notes: listing.notes,
  assignee: listing.assignee,
  creator: listing.creator,
  createdAt: listing.createdAt,
  id: listing.id,
  status: listing.status,
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

  const visibleData = data
    ? data.filter((el) => el.status !== "CANCELLED" && el.status !== 'DELIVERED')
    : [];

  return (
    <div>
      <loginContext.Consumer>
        {({ userInfo }) => {
          return (
            <>
              {!!userInfo && createIsOpen && (
                <CreateListingModal
                  userInfo={userInfo}
                  closeHandler={() => setCreateIsOpen(false)}
                  newDataHandler={(newData) => {
                    setData([newData, ...data]);
                  }}
                />
              )}
              {!userInfo && createIsOpen && (
                <SignUpModal
                  closeHandler={() => setCreateIsOpen(false)}
                  extraMessage="Uma conta é necessária para criar uma lista de compras! Se já não possui uma conta, basta se cadastrar."
                />
              )}
              {showingList >= 0 && (
                <ViewListingModal
                  assignHandler={(id, assignee) =>
                    setData(
                      data.map((el) => {
                        if (el.id === id) {
                          return {
                            ...el,
                            assignee,
                            status: 'ASSIGNED',
                          };
                        }
                        return el;
                      })
                    )
                  }
                  closeHandler={() => setShowingList(-1)}
                  updateStatusHandler={(id, newStatus) => 
                    setData(
                      data.map((el) =>
                        el.id === id ? { ...el, status: newStatus } : el
                      )
                    )}
                  userInfo={userInfo}
                  {...spreadInputProps(visibleData[showingList])}
                />
              )}
            </>
          );
        }}
      </loginContext.Consumer>
      {/* View listing Modal */}

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
        <Listings listings={visibleData} selectListHandler={setShowingList} />
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
