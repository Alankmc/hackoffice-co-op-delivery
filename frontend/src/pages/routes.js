import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./main-page";
import ListProvider from "../contexts/lists";
import LoginProvider from "../contexts/login";

const MainRouter = () => {
  return (
    <ListProvider>
      <LoginProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </LoginProvider>
    </ListProvider>
  );
};

export default MainRouter;
