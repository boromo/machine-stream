import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MachinePage from '../containers/MachinePage';
import NotFoundPage from '../containers/NotFoundPage';
import MachinesPage from '../containers/MachinesPage';

export default (
  <Switch>
    <Route exact path="/" component={MachinesPage} />
    <Route path="/machine/:machineId" component={MachinePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
