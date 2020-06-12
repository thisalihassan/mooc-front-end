import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//import { Colxx, Separator } from '../../components/CustomBootstrap';
//import BreadcrumbContainer from '../../components/BreadcrumbContainer';
import chat from './chat';

const Applications = ({ match }) => (
  <div className='dashboard-wrapper'>
    <Switch>
      <Route path={`${match.url}/chat`} component={chat} />
      <Redirect to='/error' />
    </Switch>
  </div>
);

export default Applications;
