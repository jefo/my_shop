import React from 'react';
import { compose, lifesycle } from 'recompose';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProductsPage from 'containers/Products';
import ModelEditor from 'containers/ModelEditor';
import Layout from 'components/Layout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: red,
  },
  overrides: {
    MuiNotchedOutline: {
      root: {
        borderRadius: 0,
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12px',
        borderRadius: 0,
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
      },
    },
  },
});

const routes = [
  {
    path: '/products',
    component: ProductsPage,
  },
];

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Layout navItems={routes}>
        <Switch>
          {routes.map(r => (
            <Route key={r.path} path={r.path} component={r.component} />
          ))}
        </Switch>
      </Layout>
    </MuiThemeProvider>
  );
}

export default App;
