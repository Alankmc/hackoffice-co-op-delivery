import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { listContext } from "../../contexts/lists";
import Loader from "../../components/loader";
import Listings from "./listings";
import PageTemplate from "../../components/page-template";
import CreateListing from "../create-listing";

const MainPage = (props) => {
  const {loading, data} = props;
  // @TODO change this
  const [createIsOpen, setCreateIsOpen] = useState(true);

  return (
    <div>
      {createIsOpen && <CreateListing closeHandler={() => setCreateIsOpen(false)}/>}
      <h1>Listagens</h1>
      <Button onClick={() => setCreateIsOpen(true)}>Criar Lista!</Button>
      {loading ? <Loader /> : (<Listings listings={data} />)}
    </div>
  );
}

function MainPageConnector() {
  return (
    <PageTemplate>
      <listContext.Consumer>
        {(listContext) => <MainPage
          data={listContext.data}
          loading={listContext.loading}
        />}
      </listContext.Consumer>
    </PageTemplate>
  );
}

export default MainPageConnector;
