import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import { listContext } from "../../contexts/lists";
import { loginContext } from "../../contexts/login";
import Loader from "../../components/loader";
import PageTemplate from "../../components/page-template";
import CreateListingModal from "../create-listing-modal";
import SignUpModal from "../sign-up-modal";
import ViewListingModal from "../view-listing-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import Listing from "../../components/listing";
import Listings from "../main-page/listings";

const LoaderWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  justify-content: center;
  display: flex;
`;

const Column = styled.div`
  width: 100%;
`;
const RightColumn = styled.div`
  width: 100%;
  margin-left: 40px;
`;

const spreadInputProps = (listing) => ({
  name: listing.name,
  products: listing.products,
  expiryDate: listing.expiryDate,
  deliveryAddress: listing.deliveryAddress,
  buyAddress: listing.buyAddress,
  notes: listing.notes,
  assignee: listing.assignee,
  creator: listing.creator,
  id: listing.id,
  status: listing.status,
  createdAt: listing.createdAt,
});

const MyListings = (props) => {
  const { listings, clickHandler } = props;
  return (
    <Column>
      <h3>Minhas Listas</h3>
      {listings && listings.length ? (
        <Listings listings={listings} selectListHandler={clickHandler} />
      ) : (
        <div>Nenhuma lista sua no momento</div>
      )}
    </Column>
  );
};

const MyAssigned = (props) => {
  const { listings, clickHandler } = props;
  return (
    <RightColumn>
      <h3>Minhas Tarefas</h3>
      {listings && listings.length ? (
        <Listings listings={listings} selectListHandler={clickHandler} />
      ) : (
        <div>Nenhuma tarefa aberta</div>
      )}
    </RightColumn>
  );
};

const ColumnWrappers = styled.div`
  display: flex;
`;

const MyInfo = (props) => {
  const { loading, data, setData, userInfo } = props;
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [showingList, setShowingList] = useState({ mine: -1, assigned: -1 });

  if (!userInfo) {
    return <Redirect to="/" />;
  }

  const myListings = data?.filter((el) => el.creator?.id === userInfo.id);
  const assignedToMe = data?.filter((el) => el.assignee?.id === userInfo.id);

  return (
    <div>
      <h1 style={{margin: 0}}>Olá {userInfo.name}!</h1>
      <ColumnWrappers>
        {showingList.mine >= 0 && (
          <ViewListingModal
            assignHandler={() => {}}
            updateStatusHandler={(id, newStatus) =>
              setData(
                data.map((el) =>
                  el.id === id ? { ...el, status: newStatus } : el
                )
              )
            }
            closeHandler={() => setShowingList({ mine: -1, assigned: -1 })}
            userInfo={userInfo}
            {...spreadInputProps(myListings[showingList.mine])}
          />
        )}
        {showingList.assigned >= 0 && (
          <ViewListingModal
            assignHandler={() => {}}
            updateStatusHandler={(id, newStatus) =>
              setData(
                data.map((el) =>
                  el.id === id ? { ...el, status: newStatus } : el
                )
              )
            }
            closeHandler={() => setShowingList({ mine: -1, assigned: -1 })}
            userInfo={userInfo}
            {...spreadInputProps(assignedToMe[showingList.assigned])}
          />
        )}
        <MyListings
          listings={myListings}
          clickHandler={(v) => setShowingList({ mine: v, assigned: -1 })}
        />
        <MyAssigned
          listings={assignedToMe}
          clickHandler={(v) => setShowingList({ assigned: v, mine: -1 })}
        />
      </ColumnWrappers>
    </div>
  );
};

const ThinPageWrapper = styled.div`
  width: 85%;
  margin: auto;
`;

function MyInfoConnector() {
  return (
    <PageTemplate>
      <ThinPageWrapper>
        <loginContext.Consumer>
          {(loginContext) => (
            <listContext.Consumer>
              {(listContext) => <MyInfo {...listContext} {...loginContext} />}
            </listContext.Consumer>
          )}
        </loginContext.Consumer>
      </ThinPageWrapper>
    </PageTemplate>
  );
}

export default MyInfoConnector;
