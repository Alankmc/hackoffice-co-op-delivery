import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import MainPage from './main-page';
import SignUp from './sign-up'
import ListProvider from '../contexts/lists';

const MainRouter = () => {
  return (
    <ListProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </ListProvider>
  )
}

export default MainRouter;
