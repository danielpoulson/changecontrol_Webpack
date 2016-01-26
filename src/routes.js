import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import Changes from 'containers/Changes';
import ChangeDetail from 'containers/ChangeDetail';;

export default (
  <Route path="/" component={App}>
    <Route path="changes" component={Changes} />
    <Route path='change/:id' component={ChangeDetail} />
     <IndexRoute component={Home} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
