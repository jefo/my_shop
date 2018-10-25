import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProductsPage from 'containers/Products';
import ModelEditor from 'containers/ModelEditor';
import Layout from 'components/Layout';

// in near future routes will load from server
const routes = [
  {
    path: '/admin/products',
    component: ProductsPage,
    text: 'Товары', // todo: i8n
  },
  {
    path: '/admin/forms',
    component: ModelEditor,
    text: 'Редактор форм',
  },
];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: red,
  },
});

export default () => (
  <MuiThemeProvider theme={theme}>
    <Layout
      navItems={routes.map(r => ({
        href: r.path,
        text: r.text,
        component: r.component,
      }))}
    >
      <Switch>
        {routes.map(r => (
          <Route key={r.path} path={r.path} render={r.component} />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  </MuiThemeProvider>
);
