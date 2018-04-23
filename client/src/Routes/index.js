import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Items from '../containers/Items';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import NotFound from '../containers/NotFound';


const Routes = () => (

    <Switch>
        <Route exact path="/" component={Items} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/*" component={NotFound} />
    </Switch>

  );

export default Routes;
