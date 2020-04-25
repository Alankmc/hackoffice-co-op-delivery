import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { listContext } from "../../contexts/lists";

function MainPage() {
  return (
    <listContext.Consumer>
      {(listContext) => {
        console.log(listContext);
        return (
          <div>
            <h1>Listagens</h1>
            <Link to="/sign-up">
              <Button type="button">Cadastrar</Button>
            </Link>
          </div>
        );
      }}
    </listContext.Consumer>
  );
}

export default MainPage;
