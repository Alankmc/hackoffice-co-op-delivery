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

const LoaderWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  justify-content: center;
  display: flex;
`;

const MyListings = (props) => {
  const { listings } = props;
  return (
    <div>
      <h3>Minhas Listas</h3>
      {listings && listings.length ? <div>Tem coisa!</div> : <div>Nenhuma lista sua no momento</div>}
    </div>
  );
};

const MyAssigned = (props) => {
  const { listings } = props;
  return (
    <div>
      <h3>Minhas Tarefas</h3>
      {listings && listings.length ? <div>Tem coisa!</div> : <div>Nenhuma tarefa aberta</div>}

    </div>
  );
};

const MyInfo = (props) => {
  const { loading, data, setData, userInfo } = props;
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [showingList, setShowingList] = useState(-1);

  if (!userInfo) {
    return <Redirect to="/" />;
  }

  const myListings = data?.filter((el) => el.creator?.id === userInfo.id);
  const assignedToMe = data?.filter((el) => el.assignee?.id === userInfo.id);
  return (
    <div>
      <MyListings listings={myListings} />
      <MyAssigned listings={assignedToMe} />
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
