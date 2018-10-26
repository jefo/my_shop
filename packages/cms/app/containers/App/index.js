import React from 'react';
import { compose, lifesycle } from 'recompose';
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

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <Layout navItems={[]}>{children}</Layout>
  </MuiThemeProvider>
);
