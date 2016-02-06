import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Home from 'containers/Home';
import Changes from 'containers/Changes';
import ChangeDetail from 'containers/ChangeDetail';
import TaskDetail from 'containers/Tasks/task-details';

export default (
  <Route path="/" component={App}>
    <Route path="changes" component={Changes} />
    <Route path='change/:id' component={ChangeDetail} />
    <Route path='task/:id' component={TaskDetail} />
     <IndexRoute component={Home} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
