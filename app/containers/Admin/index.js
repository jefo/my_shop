import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/Layout';
import { withStyles } from '@material-ui/core/styles';

const AdminApp = props => (
  <Layout
    {...props}
    navItems={props.routes.map(r => ({
      href: r.path,
      text: r.text,
      component: r.component,
    }))}
  >
    <Switch>
      {props.routes.map(r => (
        <Route key={r.path} path={r.path} component={r.component} />
      ))}
    </Switch>
  </Layout>
);

export default AdminApp;
