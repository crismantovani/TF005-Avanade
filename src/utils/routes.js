import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/home/index';
import PickOrder from '../pages/pickOrder/index';
import RegisterOrder from '../pages/registerOrder/index';
import RegisterUser from '../pages/registerUser/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/order/pick" component={PickOrder} />
      <Route exact path="/order/register" component={RegisterOrder} />
      <Route exact path="/user/register" component={RegisterUser} />
      <Route component={() => <div>Page 404!</div>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
